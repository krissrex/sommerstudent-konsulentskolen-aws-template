import * as cdk from "aws-cdk-lib";
import * as constructs from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ssm from "aws-cdk-lib/aws-ssm";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { TargetType } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import {
  ssmAlbArn,
  ssmAlbDnsName,
  ssmAlbFullName,
  ssmAlbHttpListenerArn,
  ssmAlbSecurityGroup,
  ssmClusterName, ssmRestApiDockerRepositoryUri,
  ssmVpcId
} from "../config";

/**
 * A Capra/Liflig employee can use this when bootstrapping Konsulentskolen's account.
 * This creates a public VPC, so students don't have to bother with this.
 * All students share the same VPC and Cluster.
 */
export class SharedInfraStack extends cdk.Stack {
  constructor(scope: constructs.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "PublicVpc", {
      natGateways: 0, // NB, ikke bruk private subnets med 0 gateways
      maxAzs: 2,
    });
    new ssm.StringParameter(this, "VpcIdParameter", {
      stringValue: vpc.vpcId,
      parameterName: ssmVpcId,
    });

    const cluster = new ecs.Cluster(this, "Cluster", {
      vpc: vpc,
      executeCommandConfiguration: {
        // https://github.com/capralifecycle/liflig-cdk/blob/28cdf66154d6b3350d8aaefebad5ffe63621eed9/src/ecs/cluster.ts#L33
        logging: ecs.ExecuteCommandLogging.NONE,
      },
    });
    new ssm.StringParameter(this, "ClusterNameParameter", {
      stringValue: cluster.clusterName,
      parameterName: ssmClusterName,
    });

    const loadBalancerSecurityGroup = new ec2.SecurityGroup(
      this,
      "LoadBalancerSecurityGroup",
      {
        vpc: vpc,
        allowAllOutbound: true,
      }
    );
    new ssm.StringParameter(this, "AlbSecurityGroupParameter", {
      stringValue: loadBalancerSecurityGroup.securityGroupId,
      parameterName: ssmAlbSecurityGroup,
    });

    const loadBalancer = new elbv2.ApplicationLoadBalancer(
      this,
      "LoadBalancer",
      {
        vpc: vpc,
        internetFacing: true,
        securityGroup: loadBalancerSecurityGroup,
      }
    );
    new ssm.StringParameter(this, "AlbArnParameter", {
      stringValue: loadBalancer.loadBalancerArn,
      parameterName: ssmAlbArn,
    });
    new ssm.StringParameter(this, "AlbFullNameParameter", {
      stringValue: loadBalancer.loadBalancerFullName,
      parameterName: ssmAlbFullName,
    })
    new ssm.StringParameter(this, "AlbDnsNameParameter", {
      stringValue: loadBalancer.loadBalancerDnsName,
      parameterName: ssmAlbDnsName,
    })

    const albTargetGroup = new elbv2.ApplicationTargetGroup(
      this,
      "AlbDefaultTargetGroup",
      {
        port: 80,
        vpc: vpc,
        targetType: TargetType.INSTANCE
      }
    );

    const httpListener = new elbv2.ApplicationListener(
      this,
      "AlbHttpListener",
      {
        loadBalancer: loadBalancer,
        port: 80,
        defaultTargetGroups: [albTargetGroup],
      }
    );
    new ssm.StringParameter(this, "HttpListener", {
      stringValue: httpListener.listenerArn,
      parameterName:  ssmAlbHttpListenerArn
    })

    new cdk.CfnOutput(this, "LoadBalancerDNS", {
      value: loadBalancer.loadBalancerDnsName,
    });

    const repo = new ecr.Repository(this, "RestApiServiceDockerRepository", {
      repositoryName: "capra-rest-api",
    })
    new ssm.StringParameter(this, "RestApiRepositoryUriParameter", {
      stringValue: repo.repositoryUri,
      parameterName: ssmRestApiDockerRepositoryUri
    })
  }
}

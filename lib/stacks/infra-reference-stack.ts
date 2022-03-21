import * as cdk from "aws-cdk-lib";
import * as constructs from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ssm from "aws-cdk-lib/aws-ssm";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import {
  ssmAlbArn, ssmAlbDnsName, ssmAlbFullName, ssmAlbHttpListenerArn,
  ssmAlbSecurityGroup,
  ssmClusterName,
  ssmVpcId
} from "../config";

/**
 * Fetches the existing shared infra for use in other stacks
 */
export class InfraReferenceStack extends cdk.Stack {
  public readonly vpc: ec2.IVpc;
  public readonly cluster: ecs.ICluster;

  /**
   * Create an ApplicationListener when you use this.
   * https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/ecs/cross-stack-load-balancer/split-at-listener.ts#L61
   * or use the existing {@link httpListener} instead
   */
  public readonly loadBalancer: elbv2.IApplicationLoadBalancer;
  public readonly httpListener: elbv2.IApplicationListener;

  constructor(scope: constructs.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    // The valueFromLookup will resolve at synth time. Make sure the param already exsists.
    // Use valueForStringParameter for deploy-time resolution.
    this.vpc = ec2.Vpc.fromLookup(this, "vpc", {
      vpcId: ssm.StringParameter.valueFromLookup(this, ssmVpcId),
    });

    this.cluster = ecs.Cluster.fromClusterAttributes(this, "Cluster", {
      vpc: this.vpc,
      clusterName: ssm.StringParameter.valueFromLookup(this, ssmClusterName),
      securityGroups: [],
    });

    const securityGroupId = ssm.StringParameter.valueFromLookup(
      this,
      ssmAlbSecurityGroup
    );
    const loadBalancerSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(this, "AlbSecurityGroup", securityGroupId, {
      allowAllOutbound: true,
    })
    this.loadBalancer =
      elbv2.ApplicationLoadBalancer.fromApplicationLoadBalancerAttributes(
        this,
        "ApplicationLoadBalancer",
        {
          loadBalancerArn: ssm.StringParameter.valueFromLookup(this, ssmAlbArn),
          vpc: this.vpc,
          securityGroupId: securityGroupId,
          loadBalancerDnsName: ssm.StringParameter.valueFromLookup(this, ssmAlbDnsName),
          loadBalancerCanonicalHostedZoneId: ssm.StringParameter.valueFromLookup(this, ssmAlbFullName),
        }
      );

    this.httpListener = elbv2.ApplicationListener.fromApplicationListenerAttributes(
      this,
      "HttpListener",
      {
        listenerArn: ssm.StringParameter.valueFromLookup(this, ssmAlbHttpListenerArn),
        securityGroup: loadBalancerSecurityGroup,
      },
    )
  }
}

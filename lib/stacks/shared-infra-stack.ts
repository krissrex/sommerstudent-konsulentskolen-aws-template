import * as cdk from "aws-cdk-lib"
import * as constructs from "constructs"
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { ssmClusterName, ssmVpcId } from "../config";


/**
 * A Capra/Liflig employee can use this when bootstrapping Konsulentskolen's account.
 * This creates a public VPC, so students don't have to bother with this.
 * All students share the same VPC and Cluster.
 */
export class SharedInfraStack extends cdk.Stack {
  constructor(scope: constructs.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    const vpc = new ec2.Vpc(this, "PublicVpc", {
      natGateways: 0, // NB, ikke bruk private subnets med 0 gateways
    })
    new ssm.StringParameter(this, "VpcIdParameter", {
      stringValue: vpc.vpcId,
      parameterName: ssmVpcId
    })

    const cluster = new ecs.Cluster(this, "Cluster", {
      vpc: vpc,
    });
    new ssm.StringParameter(this, "ClusterNameParameter", {
      stringValue: cluster.clusterName,
      parameterName: ssmClusterName
    })

  }
}

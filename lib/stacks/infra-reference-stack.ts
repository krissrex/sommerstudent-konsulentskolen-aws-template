import * as cdk from "aws-cdk-lib";
import * as constructs from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { ssmClusterName, ssmVpcId } from "../config";

/**
 * Fetches the existing shared infra for use in other stacks
 */
export class InfraReferenceStack extends cdk.Stack {
  public readonly vpc: ec2.IVpc
  public readonly cluster: ecs.ICluster

  constructor(scope: constructs.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    // The valueFromLookup will resolve at synth time. Make sure the param already exsists.
    // Use valueForStringParameter for deploy-time resolution.
    this.vpc = ec2.Vpc.fromLookup(this, "vpc", {
      vpcId: ssm.StringParameter.valueFromLookup(this, ssmVpcId),
    })

    this.cluster = ecs.Cluster.fromClusterAttributes(this, "Cluster", {
      vpc: this.vpc,
      clusterName: ssm.StringParameter.valueFromLookup(this, ssmClusterName),
      securityGroups: []
    })
  }
}

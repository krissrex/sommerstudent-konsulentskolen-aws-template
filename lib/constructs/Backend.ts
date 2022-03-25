import { Construct } from "constructs";
import { ISecurityGroup, IVpc, SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import { Cluster, ContainerImage, ICluster } from "aws-cdk-lib/aws-ecs";
import { IApplicationLoadBalancer } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { IRepository } from "aws-cdk-lib/aws-ecr";
import { dittNavn } from "../config";
import { CfnOutput } from "aws-cdk-lib";

export interface Props {
  vpc: IVpc
  dockerRepository: IRepository
  cluster: ICluster
  loadBalancer: IApplicationLoadBalancer
  loadBalancerSecurityGroup: ISecurityGroup
}

export class Backend extends Construct {

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);


    const service = new ecsPatterns.ApplicationLoadBalancedFargateService(this, "Service", {
      vpc: props.vpc,
      cluster: props.cluster,
      loadBalancer: props.loadBalancer,
      assignPublicIp: true,
      cpu: 512,
      memoryLimitMiB: 2048,
      desiredCount: 2,
      securityGroups: [props.loadBalancerSecurityGroup],
      taskImageOptions: {
        image: ContainerImage.fromEcrRepository(props.dockerRepository, "latest"),
        containerPort: 8000,
        containerName: `${dittNavn}Backend`,
        environment: {},
      }
    })

    new CfnOutput(this, "BackendUrl", {
      value: service.loadBalancer.loadBalancerDnsName,
    });
  }
}
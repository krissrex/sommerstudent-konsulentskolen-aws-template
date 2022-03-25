import * as cdk from "aws-cdk-lib";
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import { Backend } from "../constructs/Backend";

export interface Props extends StackProps {
  /** Virtual Private Cloud. Nettverks-greie. */
  vpc: ec2.IVpc;

  /** Elastic Container Service (ECS) Cluster. Her legger man Fargate services med Docker-containere. */
  cluster: ecs.ICluster;

  /** En Load Balancer videresender nettverkstrafikk fra utenfra (din pc, clients) til en docker container i ECS. */
  loadBalancer: elbv2.IApplicationLoadBalancer;

  loadBalancerSecurityGroup: ec2.ISecurityGroup;

  backendDockerRepository: ecr.IRepository;

  /** Listener som lytter på port 80. Den er en del av {@link loadBalancer},
   * og har reglene som oversetter fra f.eks. HTTP Host-header til en TargetGroup med Docker containere.
   */
  httpListener: elbv2.IApplicationListener;
}

/**
 * Setter opp din applikasjon i AWS.
 *
 * Lag ressuser her, med `new Ressurs()`, f.eks.
 * ```typescript
 * new s3.Bucket(this, "MyBucket", {})
 * ```
 *
 * De blir definert i det constructor (`new`) kalles,
 * "rendret" til CloudFormation yaml/json med `cdk synth`, og deployet
 * til CloudFormation med `cdk deploy`.
 */
export class MyCoolAwsStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    const queue = new sqs.Queue(this, "ExampleQueue", {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    // Create an ECS Fargate service
    //  https://github.com/aleksil/ctfd-cdk-example/blob/master/src/stacks/ctfd-stack.ts#L87
    // or https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/ecs/cross-stack-load-balancer/split-at-listener.ts#L44
    // Create a task definition for ECS

    // Create a listener rule in the httpListener, that uses Host/route to forward to your ecs service

    // Set SQS, SNS, S3 urls etc. as environment names on the docker container

    // Create a route53 A record to the ALB

    new Backend(this, "Backend", {
      vpc: props.vpc,
      cluster: props.cluster,
      loadBalancer: props.loadBalancer,
      dockerRepository: props.backendDockerRepository,
      loadBalancerSecurityGroup: props.loadBalancerSecurityGroup
    });
  }
}

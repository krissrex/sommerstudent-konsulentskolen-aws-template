import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { IVpc } from "aws-cdk-lib/aws-ec2";
import { ICluster } from "aws-cdk-lib/aws-ecs";

export interface Props extends StackProps {
  vpc: IVpc
  cluster: ICluster
}

export class MyCoolAwsStack extends Stack {
  constructor(scope: Construct, id: string, props?: Props) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    const queue = new sqs.Queue(this, 'ExampleQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    // Get the VPC (Virtual Private Network) from props

    // Create an ECS service
    //  https://github.com/aleksil/ctfd-cdk-example/blob/master/src/stacks/ctfd-stack.ts#L87

    // Create a task definition for ECS
    // Set SQS, SNS, S3 urls etc. as environment names on the docker container

    // Create an Application Load Balancer (ALB) to route public traffic to the ECS

    // Create a route53 A record to the ALB
  }
}

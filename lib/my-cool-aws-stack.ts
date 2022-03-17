import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyCoolAwsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    const queue = new sqs.Queue(this, 'SommerstudentKonsulentskolenAwsTemplateQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    // Get the VPC (Virtual Private Network) from props

    // Create an ECS service
    // Create a task definition for ECS
    // Set SQS, SNS, S3 urls etc. as environment names on the docker container

    // Create an Application Load Balancer (ALB) to route public traffic to the ECS

    // Create a route53 A record to the ALB
  }
}

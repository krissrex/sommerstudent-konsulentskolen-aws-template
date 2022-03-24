import { Construct } from "constructs";
import * as sns from "aws-cdk-lib/aws-sns";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { InlineCode, Runtime } from "aws-cdk-lib/aws-lambda";

export interface Props {
  ingressQueue: sqs.Queue
  egressTopic: sns.Topic
}

export class SnsLambda extends Construct {
  public readonly lambda: lambda.Function
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    this.lambda = new lambda.Function(this, "Lambda", {
      runtime: Runtime.NODEJS_14_X,
      code: new InlineCode(lambdaHandlerCode),
      handler: "index.handler",
      environment: {
        topicArn: props.egressTopic.topicArn
      },
      timeout: Duration.seconds(10),
      memorySize: 128,
    })

    this.lambda.addEventSource(new SqsEventSource(props.ingressQueue, {
      batchSize: 1,
    }))

    props.egressTopic.grantPublish(this.lambda)
  }
}

const lambdaHandlerCode =
`
"use strict"
const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});

exports.handler = async(event) => {
  const sns = new AWS.SNS();

  await sns.publish({
    Message: "Hello " + JSON.stringify(event), /* required */
    Subject: "Message from lambda",
    TopicArn: process.env.topicArn
  }).promise();
};
`
#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { MyCoolAwsStack } from "../lib/stacks/my-cool-aws-stack";
import { accountId, applyTags, dittNavn } from "../lib/config";
import { SharedInfraStack } from "../lib/stacks/shared-infra-stack";
import { InfraReferenceStack } from "../lib/stacks/infra-reference-stack";

const app = new cdk.App();
applyTags(app);

if (dittNavn == "capra") {
  new SharedInfraStack(app, "SharedInfraStack", {
    env: { account: accountId, region: "eu-west-1" },
    description:
      "Shared VPC and ECS Cluster. Only a Capra employee has to set up this.",
  });
} else {
  const infra = new InfraReferenceStack(app, `${dittNavn}InfraReference`, {
    env: { account: accountId, region: "eu-west-1" },
  });

  new MyCoolAwsStack(app, `${dittNavn}Stack`, {
    /** If you don't specify 'env', this stack will be environment-agnostic.
     * Account/Region-dependent features and context lookups will not work,
     * but a single synthesized template can be deployed anywhere. */

    env: { account: accountId, region: "eu-west-1" },
    vpc: infra.vpc,
    cluster: infra.cluster,
    loadBalancer: infra.loadBalancer,
    httpListener: infra.httpListener,
    backendDockerRepository: infra.backendDockerRepository,
    loadBalancerSecurityGroup: infra.loadBalancerSecurityGroup,
  });
}

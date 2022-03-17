#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {MyCoolAwsStack} from '../lib/my-cool-aws-stack';

// Alle stacks skal til samme AWS konto. Navnet ditt gjør det lettere å finne din stack
const konsulentNavn: string = "kristian"; //throw Error("Endre denne og slett Error.")

const app = new cdk.App();
new MyCoolAwsStack(app, `${konsulentNavn}Stack`, {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  env: {account: "TODO", region: "eu-west-1"},
});
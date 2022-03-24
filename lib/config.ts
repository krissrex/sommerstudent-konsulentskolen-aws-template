

import * as constructs from "constructs";
import { tagResources } from "./tags";


export const accountId = "701519849458";

/** Alle stacks skal til samme AWS konto. Navnet ditt gjør det lettere å finne din stack */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const dittNavn: string = "kristian";
if (dittNavn == "capra" || dittNavn == "kristian" ) {
  throw Error("Endre dittNavn til noe unikt!")
}

export function applyTags(scope: constructs.Construct): void {
  tagResources(scope, (stack) => ({
    StackName: stack.stackName,
    Project: `${dittNavn}-konsulentskolen`,
    SourceRepo: "github/krissrex/sommerstudent-konsulentskolen-aws-template",
  }));
}

export const ssmVpcId = "/cdk/infra/vpcId"
export const ssmClusterName = "/cdk/infra/clusterName"
export const ssmAlbArn = "/cdk/infra/albArn"
export const ssmAlbFullName = "/cdk/infra/albFullName"
export const ssmAlbDnsName = "/cdk/infra/albDnsName"
export const ssmAlbSecurityGroup = "/cdk/infra/albSecurityGroup"
export const ssmAlbHttpListenerArn = "/cdk/infra/albHttpListenerArn"

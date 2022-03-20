

import * as constructs from "constructs";
import { tagResources } from "./tags";


export const accountId = "701519849458";

/** Alle stacks skal til samme AWS konto. Navnet ditt gjør det lettere å finne din stack */
export const dittNavn = "capra"; // throw Error("Endre denne og slett Error.")

export function applyTags(scope: constructs.Construct): void {
  tagResources(scope, (stack) => ({
    StackName: stack.stackName,
    Project: `${dittNavn}-private`,
    SourceRepo: "github/krissrex/sommerstudent-konsulentskolen-aws-template",
  }));
}

export const ssmVpcId = "cdk/infra/vpcId"
export const ssmClusterName = "cdk/infra/clusterName"

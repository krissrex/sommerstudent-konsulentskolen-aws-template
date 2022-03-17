import * as cdk from "aws-cdk-lib"
import * as constructs from "constructs"

interface Props extends cdk.StackProps {
}

/**
 * A Capra/Liflig employee can use this when bootstrapping Konsulentskolen's account.
 * This creates a public VPC, so students don't have to bother with this.
 */
export class PublicVpcStack extends cdk.Stack {
  constructor(scope: constructs.Construct, id: string, props: Props) {
    super(scope, id, props)

    // FIXME create VPC
  }
}

# Welcome to your CDK TypeScript project

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npm run lint`    Run lint


* `npm run cdk deploy`  deploy this stack to your default AWS account/region
* `npm run cdk diff`    compare deployed stack with current state
* `npm run cdk synth`   emits the synthesized CloudFormation template
* `npm run cdk ls`      View stacks
* `npm run cdk diff <stack>`
* `npm run cdk deploy <stack>`


# Ressurser

- Slides https://docs.google.com/presentation/d/1G2JG5k0OweObcymyH4EvTzNG9Kp8RJChe5NPP_mAi7M/edit#slide=id.p
- CDK tutorial https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#hello_world_tutorial
- Your first cdk stack https://docs.aws.amazon.com/cdk/v2/guide/hello_world.html
- Referanse-repo https://github.com/aleksil/ctfd-cdk-example/tree/master/src
- how-to https://docs.aws.amazon.com/cdk/v2/guide/how_tos.html
- API reference https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html
- 

# Hvordan dette ble satt opp

1. Lagde prosjektet fra `npx aws-cdk init app --language=typescript`
2. Importerte til IntelliJ fra "existing sources"
3. Genererte `.gitignore` på https://www.toptal.com/developers/gitignore/api/macos,linux,windows,node 
4. La inn noe ekstra i `.gitignore` for cdk
5. La inn en ressurs i [sommerstudent-konsulentskolen-aws-template-stack.ts](lib/stacks/my-cool-aws-stack.ts)
6. Installer og sett opp Prettier, ESlint (`npx eslint --init`), la inn prettier config til eslint
7. La inn `config.ts` og `tags.ts` fra aleksi, og tok de i bruk.
8. Pekte ts output til `out/`
9. La inn aws konto i aws-vault, og pekte den til eu-west-1.
10. `aws-vault exec ks2 -- npx cdk bootstrap aws://701519849458/eu-west-1`
    1. Denne lager en CloudFormation stack: `CDKToolkit`.
11. 
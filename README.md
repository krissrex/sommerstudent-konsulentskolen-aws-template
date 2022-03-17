# Welcome to your CDK TypeScript project

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

# Ressurser

- Slides https://docs.google.com/presentation/d/1G2JG5k0OweObcymyH4EvTzNG9Kp8RJChe5NPP_mAi7M/edit#slide=id.p
- CDK tutorial https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#hello_world_tutorial 
- 

# Hvordan dette ble satt opp

1. Lagde prosjektet fra `npx aws-cdk init app --language=typescript`
2. Importerte til IntelliJ fra "existing sources"
3. Genererte `.gitignore` på https://www.toptal.com/developers/gitignore/api/macos,linux,windows,node 
4. La inn noe ekstra i `.gitignore` for cdk
5. La inn en ressurs i [sommerstudent-konsulentskolen-aws-template-stack.ts](lib/my-cool-aws-stack.ts)
6. Installer og sett opp Prettier, ESlint (`npx eslint --init`), la inn prettier config til eslint
7. 
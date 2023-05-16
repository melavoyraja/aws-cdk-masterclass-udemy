import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda'
import { join } from 'path';
import { CfnOutput } from 'aws-cdk-lib';
import { Effect, Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class TsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new Function(this, 'Hello-cdk-lambda', {
      runtime: Runtime.PYTHON_3_10,
      memorySize: 512,
      handler: 'listLambdaFunctions.main',
      code: Code.fromAsset(join(__dirname, '../lambdas')),
      environment: {
        NAME: 'Puneeth',
        AGE: '30'
      }
    })

    const listBucketPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['s3:*'],
      resources: ['*']
    })

    const listLambdaFunctionPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['lambda:*'],
      resources: ['*']
    })

    handler.role?.attachInlinePolicy(
      new Policy(this, 'list-resources', {
        statements: [listBucketPolicy]
      })
    )

    handler.role?.attachInlinePolicy(
      new Policy(this, 'list-functions', {
        statements: [listLambdaFunctionPolicy]
      })
    )

    new CfnOutput(this, 'function-arn', {'value': handler.functionArn })
    
  }
}

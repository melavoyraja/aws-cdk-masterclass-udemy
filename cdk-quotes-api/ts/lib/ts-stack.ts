

import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { join } from 'path';

export class TsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const getQuotes = new Function(this, 'getQuotesLambdaTS', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(__dirname, '../lambdas')),
      handler: 'getQuotes.handler'
    })

    const api = new RestApi(this, 'quotes-api', {
      description: 'Quotes API',
    })

    const mainPath = api.root.addResource("quotes")
    mainPath.addMethod("GET", new LambdaIntegration(getQuotes))

  }
}

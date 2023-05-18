from aws_cdk import (
    # Duration,
    Stack,
    # aws_sqs as sqs,
    aws_lambda,
    aws_apigateway
)
from constructs import Construct


class PythonStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        lambda_func = aws_lambda.Function(
            self,
            "getQuotesLambdaPython",
            runtime=aws_lambda.Runtime.PYTHON_3_9,
            code=aws_lambda.Code.from_asset("lambdas"),
            handler="get_quotes.handler"
        )

        rest_api = aws_apigateway.RestApi(self, 'quotes-api-python', description='Quotes API')

        mainPath = rest_api.root.add_resource("quotes")
        mainPath.add_method("GET", aws_apigateway.LambdaIntegration(lambda_func))


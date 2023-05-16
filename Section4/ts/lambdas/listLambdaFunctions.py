import boto3

client = boto3.client('lambda')

def main(event, context):
    response = client.list_functions()
    list_functions = []
    for function in response['Functions']:
        list_functions.append(function['FunctionName'])
        print(f"{ function['FunctionName'] }")
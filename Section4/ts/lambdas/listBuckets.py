import boto3

client = boto3.client("s3")


def main(event, context):
    response = client.list_buckets()
    bucket_names = []
    for bucket in response["Buckets"]:
        bucket_names.append(bucket["Name"])
        print(f" {bucket['Name']} ")

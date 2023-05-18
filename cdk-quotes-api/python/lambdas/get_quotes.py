import random, json


def handler(event, context):
    quotes = [
        {"quote":"1 testing 1232","by":"test1"},
        {"quote":"2 testing 1232","by":"test2"},
        {"quote":"3 testing 1232","by":"test3"},
        {"quote":"4 testing 1232","by":"test4"},
        {"quote":"5 testing 1232","by":"test5"},
        {"quote":"6 testing 1232","by":"test6"},
    ]
    
    item = quotes[random.randint(0, len(quotes)-1)]

    return {
        'statusCode': 200,
        'body': json.dumps(item),
        'headers': {"Content-Type":"application/json"},
    };

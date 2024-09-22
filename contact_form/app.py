import json
import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    # Parse the incoming JSON data
    body = json.loads(event['body'])
    name = body.get('name')
    email = body.get('email')
    message = body.get('message')

    # Validate input
    if not all([name, email, message]):
        return {
            'statusCode': 400,
            'body': json.dumps('Missing required fields')
        }

    # Send email using SES
    SENDER = "Site FluxGHG <contato@fluxghg.com>"
    RECIPIENT = "contato@fluxghg.com"
    SUBJECT = f"New contact form submission from {name}"

    BODY_TEXT = f"Name: {name}\nEmail: {email}\nMessage: {message}"
    
    CHARSET = "UTF-8"

    client = boto3.client('ses')

    try:
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    RECIPIENT,
                ],
            },
            Message={
                'Body': {
                    'Text': {
                        'Charset': CHARSET,
                        'Data': BODY_TEXT,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': SUBJECT,
                },
            },
            Source=SENDER,
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {
            'statusCode': 500,
            'body': json.dumps('Error sending email')
        }
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])
        return {
            'statusCode': 200,
            'body': json.dumps('Message sent successfully')
        }
#!/bin/bash

stack_name=eda-test-stack

awslocal cloudformation deploy --stack-name $stack_name --template-file infra.yaml --parameter-overrides MyPublishUserPassword=pubuserpassword MyQueueUserPassword=queueuserpassword

echo "Stack $stack_name deployed"

echo "Updating .env files"

app_events_topic_ARN=$(awslocal cloudformation describe-stacks --stack-name eda-test-stack --query "Stacks[0].Outputs[?OutputKey == 'AppEventsTopicARN'].OutputValue | [0]" --output text)
service_a_queue_URL=$(awslocal cloudformation describe-stacks --stack-name eda-test-stack --query "Stacks[0].Outputs[?OutputKey == 'ServiceAQueueURL'].OutputValue | [0]" --output text)
service_b_queue_URL=$(awslocal cloudformation describe-stacks --stack-name eda-test-stack --query "Stacks[0].Outputs[?OutputKey == 'ServiceBQueueURL'].OutputValue | [0]" --output text)

echo "APP_EVENTS_TOPIC_ARN=$app_events_topic_ARN" > ./services/A/.env
echo "APP_EVENTS_TOPIC_ARN=$app_events_topic_ARN" > ./services/B/.env

echo "QUEUE_URL=$service_a_queue_URL" >> ./services/A/.env
echo "QUEUE_URL=$service_b_queue_URL" >> ./services/B/.env

echo "Finished"
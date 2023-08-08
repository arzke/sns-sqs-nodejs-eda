#!/bin/bash

awslocal cloudformation delete-stack --stack-name eda-test-stack

echo "Stack destroyed"
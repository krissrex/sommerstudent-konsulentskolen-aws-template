#!/usr/bin/env bash

# First, authenticate to ECR with:
# aws-vault exec ks2 -- aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 701519849458.dkr.ecr.eu-west-1.amazonaws.com

echo Remember to build first, with ./build-rest-api-docker.sh
IMAGE_ID="$(docker images ks2-rest-api:latest --quiet)"

echo Tagging
docker tag "$IMAGE_ID" 701519849458.dkr.ecr.eu-west-1.amazonaws.com/capra-rest-api:latest

echo Pushing
docker push 701519849458.dkr.ecr.eu-west-1.amazonaws.com/capra-rest-api:latest

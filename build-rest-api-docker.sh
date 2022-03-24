#!/usr/bin/env bash

docker build rest-api-docker -t ks2-rest-api:latest

echo Test with docker run -p 8000:8000 ks2-rest-api:latest

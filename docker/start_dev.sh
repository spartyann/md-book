#!/bin/bash

cd $(dirname $0)

set -e

sudo docker-compose -f ./docker-compose.dev.yml up -d 

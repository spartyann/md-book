#!/bin/bash

cd $(dirname $0)

sudo docker-compose -f ./docker-compose.dev.yml down

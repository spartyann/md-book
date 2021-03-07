#!/bin/bash

cd $(dirname $0)
source ../vars.sh

set -e

sudo docker tag md-book:latest spartyann/md-book:latest
sudo docker tag md-book-db:latest spartyann/md-book-db:latest

sudo docker push spartyann/md-book:latest
sudo docker push spartyann/md-book-db:latest

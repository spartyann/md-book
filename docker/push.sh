#!/bin/bash

cd $(dirname $0)
source ../vars.sh

set -e

sudo docker tag md-book:latest spartyann/md-book:$VERSION
sudo docker tag md-book-db:latest spartyann/md-book-db:$VERSION

sudo docker push spartyann/md-book:$VERSION
sudo docker push spartyann/md-book-db:$VERSION

#!/bin/bash

source ../vars.sh

onError()
{
	exit 1;
}
trap 'onError' ERR

cd images

DIR=$(ls | egrep 'md-*')

for d in $DIR; do 
	cd $d

	echo ""
	echo "*******************************************"
	echo "> $d"
	echo "*******************************************"
	echo ""
	
	sudo docker build -t $d:latest -f "$PWD/Dockerfile" "$ROOT"

	cd ..
done

cd ..

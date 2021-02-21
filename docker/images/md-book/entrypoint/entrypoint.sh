#!/bin/bash
set -e

if [ "bash" == "$@" ]; then
	bash
	exit 0
fi

#mkdir -p /jobs
#export > /jobs/env.sh
#chmod a+x /jobs/*.sh

cd /app/server

#if [ "$DB_HOST" = "localhost" ]; then
#	export DB_HOST=$(route | awk '/^default/ { print $2 }')
#fi


echo '' > .env
echo "PORT=$PORT" >> .env
echo "DB_HOST=$DB_HOST" >> .env
echo "DB_PORT=$DB_PORT" >> .env
echo "DB_USERNAME=$DB_USERNAME" >> .env
echo "DB_PASSWORD=$DB_PASSWORD" >> .env
echo "DB_DATABASE=$DB_DATABASE" >> .env

# exec Node
exec "$@"

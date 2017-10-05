#! /bin/bash

PATH=$PATH:./node_modules/.bin

if ! test $(which psql)
then
    echo "You don't have postgres and I'm too lazy to set it up for you."
else
    dropdb weather-app
    createdb weather-app
fi

npm install
npm run db:latest
npm run db:seed

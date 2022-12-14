#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

printf "${GREEN}start development${NC}\n"

printf "docker app id:"
docker run -d -t --net=host --name=reservationRoomApp reservationroom
printf "\n"

printf "docker db id:"
docker run -d -t --net=host --name=reservationRoomDB -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin mongo 
docker cp deploy/dump/ reservationRoomDB:/dump
docker exec reservationRoomDB mongorestore -u admin -p admin dump/
printf "\n"

sleep 2s

# START APP
docker exec reservationRoomApp npm run dev
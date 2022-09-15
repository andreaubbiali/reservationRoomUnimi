#!/bin/bash

printf "DELETE CONTAINERS\n"
docker stop reservationRoomApp
docker stop reservationRoomDB

docker rm reservationRoomApp
docker rm reservationRoomDB

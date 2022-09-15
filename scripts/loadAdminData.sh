#!/bin/bash

sleep 3

printf "add records in db \n"
curl -X POST http://localhost:9090/api/user/register --output logLoadAdmin -H 'Content-Type:application/json' -d "{\"email\":\"admin@admin.it\", \"password\":\"adminPassword\", \"firstName\":\"admin\", \"lastName\":\"admin\"}" 
rm logLoadAdmin


# cat <<EOF | touch ciao
# touch ciao2
# EOF

# cat <<EOF | docker exec -t reservationRoomDB bash 
# mongosh -u admin -u admin
# use programmazione-web-mobile
# db.users.updateOne({firstName:'admin'}, {$set:{isAdmin:true}});
# EOF
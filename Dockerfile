FROM ubuntu:latest AS reservationRoomApp

WORKDIR "/app"

COPY / .

RUN apt-get update && apt-get upgrade -y
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install nodejs -y
RUN npm install
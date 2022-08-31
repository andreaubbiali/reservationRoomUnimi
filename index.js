const http = require("http");

/**
 * Start server
 */

const serverApp = require("./server/app");
const server = http.createServer(serverApp);
const serverPort = process.env.API_PORT;
const express = require("express");

// server listening 
server.listen(serverPort, () => {
    console.log(`Server running on port ${serverPort}`);
});

/**
 * Start client
 */

const clientApp = require("./client/app");

clientApp.use(express.static('public'));

const client = http.createServer(clientApp);
const clientPort = process.env.CLIENT_PORT;

// server listening 
client.listen(clientPort, () => {
    console.log(`Client running on port ${clientPort}`);
});
const { Client } = require('pg');
const envIP = '3.20.247.222';
const connectionString = `postgres://ubuntu:ubuntu@${envIP}/products`;

// const connectionString = `postgres://pscheutzow:password@localhost:5432/products`;

const client = new Client({
  connectionString: connectionString
});

client.connect();

module.exports.client = client;

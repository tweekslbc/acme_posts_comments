const pg = require('pg');
const uuid = require('uuid');
const { Client } = pg;

const client = new Client('postgres://localhost/acme_post_tags_db');

client.connect();

const generateIds = (...names)=> {
  return names.reduce((acc, name)=> {
    acc[name] = uuid.v4();
    return acc;
  }, {});
};
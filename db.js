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

const ids = generateIds('node_category','express_category', 'react_category','dev_1', 'dev_2', 'dev_3');

const SQL=
    `DROP TABLE IF EXISTS tags;
 DROP TABLE IF EXISTS posts;
 CREATE TABLE posts(
    id UUID PRIMARY KEY,
    topic VARCHAR(255) 
    UNIQUE NOT NULL
 );
    CREATE TABLE tags
 (
      id UUID PRIMARY KEY,
      text VARCHAR(255) UNIQUE NOT NULL,
      post_id UUID REFERENCES posts(id)
 );



`
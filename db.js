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
 
    INSERT INTO posts(id, topic)
    VALUES('${ids.node_category}','Node');
    
    INSERT INTO posts(id, topic)
    VALUES('${ids.express_category}','Express');
    
    INSERT INTO posts(id, topic)
    VALUES ('${ids.react_category}', 'React');
    
    INSERT INTO tags(id, text, post_id)
    VALUES('${ids.dev_1}', 'It was boring...', '${ids.express_category}');
    
    INSERT INTO tags(id, text, post_id) 
    VALUES('${ids.dev_2}','It was good!','${ids.react_category}');

    INSERT INTO tags(id, text, post_id) 
    VALUES('${ids.dev_3}','I dont understand it...','${ids.react_category}');
`;
    
const syncAndSeed = async()=> {
  await client.query(SQL);
  console.log('ITS ALIVE!!!!!');
};

const findAllPosts = async()=> {
  const response = await client.query('SELECT * FROM posts');
  return response.rows;
};
const findAllTags = async()=> {
  const response = await client.query('SELECT * FROM tags');
  return response.rows;
};

module.exports = {
  syncAndSeed,
  findAllPosts,
  findAllTags
};

    




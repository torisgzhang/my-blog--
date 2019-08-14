const env = process.env.NODE_ENV;

let MYSQL_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'torisg_blog'
};
if(env === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'torisg_blog'
  }
}

if(env === 'production') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'torisg_blog'
  }
}

module.exports = {
  MYSQL_CONFIG
};
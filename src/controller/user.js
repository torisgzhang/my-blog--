const uuid = require('uuid/v1');
const { exec } = require('../db/mysql');

const login = (username, password) => {
  let sql = `SELECT * from tg_users WHERE username='${username}' AND password='${password}'`;
  return exec(sql).then(loginResult => {
    return loginResult[0] || {};
  });
}

module.exports = {
  login
}
const loginCheck = (username, password) => {
  if(username === 'Torisg' && password === '123456') {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  loginCheck
}
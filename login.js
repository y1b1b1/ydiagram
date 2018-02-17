

function isValidUser(name, password) {
  if (name == "bobo" && password == "123") {
    return true;
  } else {
    return false;
  }
}

exports.isValidUser = isValidUser;

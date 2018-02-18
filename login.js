var db = require('./db');

function isValidUser(name, password, callback) {
  var sql = 'SELECT user FROM users WHERE user="'+name+'" AND password="'+password + '"';
  db.QuerySql(sql, function(err, result) {
    if (err) {
      console.log(err);
      callback(false);
    } else {
      if (result.length>0) {
        callback(true);
      } else {
        callback(false);
      }
    }
  });
}

function isUserExist(name, callback) {
  var sql = 'SELECT user FROM users WHERE user="'+name+'"';
  db.QuerySql(sql, function(err, result) {
    if (err) {
      console.log(err);
      callback(true);
    } else {
      if (result.length>0) {
        callback(true);
      } else {
        callback(false);
      }
    }
  });
}

function regUser(name, password, callback) {
  var sql = 'INSERT INTO users VALUES("'+name+'","'+password+'")';
  db.QuerySql(sql, function(err, result) {
    if (err) {
      console.log(err);
      callback(false);
    } else {
      callback(true);
    }
  });
}

exports.isValidUser = isValidUser;
exports.isUserExist = isUserExist;
exports.regUser = regUser;

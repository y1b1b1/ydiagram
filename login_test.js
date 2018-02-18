var async = require("async");
var login = require('./login');


var TestCases = [];

// Login Test
function isValidUser(callback) {
  login.isValidUser('bobo', '123' , function(valid) {
    console.log('isValidUser  user: bobo  password: 123 is:' + valid);
    callback(null, "isValidUser");
  });
}
TestCases.push(isValidUser);

// Exist Test
function isUserExist(callback) {
  login.isUserExist('bobo' , function(valid) {
    console.log('isUserExist  user: bobo :' + valid);
    callback(null, "isUserExist");
  });
}
TestCases.push(isUserExist);

// Reg Test
function regUser(callback) {
  login.regUser('bobo', '123' , function(valid) {
    console.log('regUser  user: bobo :' + valid);
    callback(null, "regUser");
  });
}
TestCases.push(regUser);
TestCases.push(isUserExist);
TestCases.push(isValidUser);

function isValidUser2(callback) {
  login.isValidUser('bobo', '1234' , function(valid) {
    console.log('isValidUser  user: bobo  password: 1234 is:' + valid);
    callback(null, "isValidUser");
  });
}
TestCases.push(isValidUser2);


async.series(TestCases, function (error, result) {
    console.log(result);
});


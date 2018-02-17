var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'safakljflakealkjflk323044334-061asd322323bczchjkl',
  cookie: {maxAge: 60 * 1000 * 30}
}));
app.use(bodyParser.urlencoded({extend: false }));
app.use(express.static('public'));


app.get('/', function (req, res) {
  if (req.session.sign) {
    console.log(req.session.name);
    //res.redirect('/main.html');
    res.render('main.ejs', {title: req.session.name});
  } else {
    res.render('login.ejs', {err: ""});
  }
});
app.post('/do_login', function(req, res) {
  // 添加登录用户合法性判别
  //  登录管理系统
  //  登录管理系统能够自动集成在系统中，然后对访问进行有效性控制，如果当前访问需要用户进行登录
  //  那么自动跳转到登录页面进行登录，登录成功后，自动跳转到登录前的访问页面。
  if (req.body.user != "bobo" || req.body.password != "123") {
    res.render('login.ejs', {err: "Invalid username or password!"});
  } else {
    req.session.sign = true;
    req.session.name = req.body.user;
    // req.body.password
    res.redirect('/main.html');
  } 
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var login = require('./login');
var diagrams = require('./diagrams');

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


app.use('/', function (req, res, next) {
  console.log("in use");
  if (req.method == "GET") {
    // 进行是否有效用户判别
    if (!req.session.sign) {
      res.render('login.ejs', {err: ""});
    } else {
      next();
    }
  } else {
    next();
  }
});

app.get('/', function (req, res) {
  var diagram_list = diagrams.getDiagramList(req.session.name);
  console.log(JSON.stringify(diagram_list));
  console.log(diagram_list.length);
  res.render('main.ejs', {title: req.session.name, list: diagram_list});
});
app.post('/do_login', function(req, res) {
  // 添加登录用户合法性判别
  //  登录管理系统
  //  登录管理系统能够自动集成在系统中，然后对访问进行有效性控制，如果当前访问需要用户进行登录
  //  那么自动跳转到登录页面进行登录，登录成功后，自动跳转到登录前的访问页面。
  if (login.isValidUser(req.body.user, req.body.password) == false) {
    res.render('login.ejs', {err: "Invalid username or password!"});
  } else {
    req.session.sign = true;
    req.session.name = req.body.user;
    // req.body.password
    res.redirect('/');
  } 
});
app.get('/editdiagram', function(req, res) {
  // 获取编辑设计的ID
  // 获取对应设计的数据信息
  // 展示流图信息
  // res.send("edit .... " + req.query.ID);
  
  res.render('mindmap.ejs', {ID: req.query.ID});
});
app.get('/deldiagram', function(req, res) {
  // 获取编辑设计的ID
  // 获取对应设计的数据信息
  // 展示流图信息
  // res.send("edit .... " + req.query.ID);
  diagrams.deldiagram(req.session.name, req.query.ID);
  res.redirect('/');
});
app.post('/do_newdiagram', function(req, res) {
  // 新建一个流图，记录title，产生新的ID
  // 先在设计列表中添加设计，然后跳转到对应的编辑页面进行编辑
  var id = diagrams.newdiagram(req.session.name, req.body.title);
  // 进入编辑页面
  var edit_url = "/editdiagram?ID=" + id;
  res.redirect(edit_url);
});


app.get('/GetDiagramModel', function(req, res) {
  var model = diagrams.getmodel(req.query.ID);
  res.send(JSON.stringify(model));
});
app.post('/SaveDiagramModel', function(req, res) {
  var model = JSON.parse(req.body.model);
  diagrams.savemodel(req.body.id, model);
  res.send("0");
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

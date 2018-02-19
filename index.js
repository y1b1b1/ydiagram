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
app.use(express.static('public/app/build'));

/*
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
*/

app.get('/', function (req, res) {
  diagrams.getDiagramList(req.session.name, function(diagram_list) {
    res.render('main.ejs', {title: req.session.name, list: diagram_list});
  });
});
app.post('/do_login', function(req, res) {
  // 添加登录用户合法性判别
  //  登录管理系统
  //  登录管理系统能够自动集成在系统中，然后对访问进行有效性控制，如果当前访问需要用户进行登录
  //  那么自动跳转到登录页面进行登录，登录成功后，自动跳转到登录前的访问页面。
  login.isValidUser(req.body.user, req.body.password, function(valid) {
    if (valid == true) {
      req.session.sign = true;
      req.session.name = req.body.user;
      // req.body.password
      res.redirect('/');
    } else {
      res.render('login.ejs', {err: "Invalid username or password!"});
    }
  });
});
app.get('/editdiagram', function(req, res) {
  // 获取编辑设计的ID
  // 获取对应设计的数据信息
  // 展示流图信息
  // res.send("edit .... " + req.query.ID);
  console.log('get /editdiagram');
  console.log(req.headers.cookie);
  console.log(req.session.name);
  res.render('mindmap.ejs', {ID: req.query.ID});
});
app.get('/deldiagram', function(req, res) {
  // 获取编辑设计的ID
  // 获取对应设计的数据信息
  // 展示流图信息
  // res.send("edit .... " + req.query.ID);
  diagrams.deldiagram(req.session.name, req.query.ID, function(result) {
    if (result == false) {
      res.send('Delete diagram fail!');
    } else {
      res.redirect('/');
    }
  });
});
app.post('/do_newdiagram', function(req, res) {
  // 新建一个流图，记录title，产生新的ID
  // 先在设计列表中添加设计，然后跳转到对应的编辑页面进行编辑
  diagrams.newdiagram(req.session.name, req.body.title, function(id) {
    if (id == -1) {
      // 返回错误
      res.send('Error: cannot create diagram!');
    } else {
      // 进入编辑页面
      var edit_url = "/editdiagram?ID=" + id;
      res.redirect(edit_url);
    }
  });
});


app.get('/GetDiagramModel', function(req, res) {
  console.log('/GetDiagramModel');
  console.log(req.headers.cookie);
  console.log(req.session.name);
  diagrams.getmodel(req.session.name, req.query.ID, function(model) {
    res.send(model);
  });
});
app.post('/SaveDiagramModel', function(req, res) {
  diagrams.savemodel(req.session.name, req.body.id, req.body.model, function(result) {
    if (result == false) {
      res.send('1');
    } else {
      res.send('0');
    }
  });
});


// App Request
app.get('/app_login', function(req, res) {
  var user = req.query.user;
  var password = req.query.password;

  console.log('get /app_login');
  console.log(req.query);
  login.isValidUser(user, password, function(valid) {
    if (valid == true) {
      req.session.sign = true;
      req.session.name = req.query.user;

      var result = {result: true};
      console.log(result);
      res.send(JSON.stringify(result));
    } else {
      var result = {result: false, error: "Invalid user or password!"};
      console.log(result);
      res.send(JSON.stringify(result));
    }
  });
});
app.get('/app_signup', function(req, res) {
  var user = req.query.user;
  var password = req.query.password;

  console.log('get /app_signup');
  console.log(req.query);
  login.isUserExist(user, function(re) {
    if (re==true) {
      var result = {result: false, error: "User has exist!"};
      res.send(JSON.stringify(result));
    } else {
      login.regUser(user, password, function(valid) {
        if (valid == true) {
          req.session.sign = true;
          req.session.name = req.body.user;
      
          var result = {result: true};
          console.log(result);
          res.send(JSON.stringify(result));
        } else {
          var result = {result: false, error: "Write to db failed!"};
          console.log(result);
          res.send(JSON.stringify(result));
        }
      });
    }
  });
  
});
app.get('/app_diagramlist', function(req, res) {
  console.log('get /app_diagramlist');
  console.log(req.headers.cookie);
  console.log(req.session.name);

  if (!req.session.sign) {
    var result = {result: false, error: "Session is invalid!", list: []};
    console.log(result);
    res.send(JSON.stringify(result));
    return ;
  } 
  diagrams.getDiagramList(req.session.name, function(diagram_list) {
    var result = {result: true, list: diagram_list};
    console.log(result);
    res.send(JSON.stringify(result));
  });
});
app.get('/app_newdiagram', function(req, res) {
  console.log('get /app_newdiagram');
  var title = req.query.title;

  if (!req.session.sign) {
    var result = {result: false, error: "Session is invalid!"};
    console.log(result);
    res.send(JSON.stringify(result));
    return ;
  } 
  diagrams.newdiagram(req.session.name, title, function(id) {
    if (id == -1) {
      var result = {result: false, error: "cannot create diagram!"};
      console.log(result);
      res.send(JSON.stringify(result));
    } else {
      var result = {result: true, error: "", id: id};
      console.log(result);
      res.send(JSON.stringify(result));
    }
  });
});
app.get('/app_deldiagram', function(req, res) {
  console.log('get /app_deldiagram');
  var id = req.query.id;

  if (!req.session.sign) {
    var result = {result: false, error: "Session is invalid!"};
    console.log(result);
    res.send(JSON.stringify(result));
    return ;
  } 
  diagrams.deldiagram(req.session.name, id, function(result) {
    if (result == false) {
      var result = {result: false, error: "cannot delete diagram!"};
      console.log(result);
      res.send(JSON.stringify(result));
    } else {
      var result = {result: true, error: ""};
      console.log(result);
      res.send(JSON.stringify(result));
    }
  });
});



var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

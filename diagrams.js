
var db = require('./db');
 

// 获取ID值
//  用户与图ID对应映射关系表中最大的ID值
var g_id_finish = false;
var g_id     = 100000000;



var g_user_models = {};
var g_models = {};

var model = { "class": "go.TreeModel", "nodeDataArray": [ {"key":0, "text":"Mind Map", "loc":"0 0", brush: "lightgreen"}]};

function queryid(callback) {
  if (g_id_finish == false) {
    var query_id_sql = 'SELECT MAX(diagramid) FROM udiagrams';
    db.QuerySql(query_id_sql, function(err, result) {
      g_id_finish = true;
      if (err) {
        console.log('Diagram ID query is ERROR! - ', err.message);
        callback();
      } else {
        console.log(result);
        if (result.length>0 && result[0]['MAX(diagramid)'] != null) {
          g_id = result[0]['MAX(diagramid)'];
        }
        console.log(g_id);
        callback();
      }
    });
  } else {
    callback();
  }
}
function newdiagram(user, title, callback) {
  // 多任务是否可能共同访问？
  queryid(function() {
    g_id = g_id + 1;
    var id = g_id;

    // 在关系表中构建用户与流图ID
    var sql = 'INSERT INTO udiagrams VALUES("' + user + '",' + id + ')';
    db.QuerySql(sql, function(err, result) {
      if (err) {
        console.log(err);
        callback(-1);
      } else {
        // 在流图列表中，插入流图信息
        sql = 'INSERT INTO diagrams VALUES(' + id + ',"' + title + '",\'' + JSON.stringify(model) + '\')';
        db.QuerySql(sql, function(err, result) {
          if (err) {
            console.log(err);
            callback(-1);
          } else {
            callback(id);
          }
        });
      }
    });
  });
}
function deldiagram(user, id, callback) {
  var sql = 'DELETE diagrams, udiagrams FROM diagrams, udiagrams WHERE udiagrams.user="' + user + '" AND udiagrams.diagramid=' + id + ' AND diagrams.diagramid=udiagrams.diagramid';

  db.QuerySql(sql, function(err, result) {
    if (err) {
      console.log(err);
      callback(false);
    } else {
      callback(true);
    }
  });
}
function getmodel(user, id, callback) {
  console.log(user);
  if (typeof(user) == "undefined") {
    user = "xxxxxxxxxxxx";
  }
  var sql = 'SELECT user FROM udiagrams WHERE user="'+user+'" AND diagramid='+id;
  console.log(sql);
  db.QuerySql(sql, function(err, result) {
    console.log(result);
    if (err) {
      console.log(err);
      callback(JSON.stringify(model));
    } else if (result.length==0) {
      callback(JSON.stringify(model));
    } else {
      var sql = 'SELECT content FROM diagrams WHERE diagramid=' + id;
      console.log(sql);
      db.QuerySql(sql, function(err, result) {
        if (err) {
          console.log(err);
          callback(JSON.stringify(model));
        } else {
          console.log(result);
          if (result.length>0) {
            callback(result[0]['content']);
          } else {
            callback(JSON.stringify(model));
          }
        }
      });
    }
  });
}
function savemodel(user, id, model_new, callback) {
  if (typeof(user) == "undefined") {
    user = "xxxxxxxxxxxx";
  }
  var sql = 'SELECT user FROM udiagrams WHERE user="'+user+'" AND diagramid='+id;
  db.QuerySql(sql, function(err, result) {
    if (err) {
      console.log(err);
      callback(false);
    } else if (result.length==0) {
      callback(false);
    } else {
      var sql = 'UPDATE diagrams SET content=\'' + model_new + '\' WHERE diagramid=' + id;
      console.log(sql);
      db.QuerySql(sql, function(err, result) {
        console.log("Save model finish!");
        if (err) {
          console.log(err);
          callback(false);
        } else {
          callback(true);
        }
      });
    }
  });
}
function getDiagramList(user, callback) {
  var sql = 'SELECT diagrams.diagramid AS diagramid, diagrams.title AS title FROM udiagrams, diagrams WHERE udiagrams.user="' + user + '" AND diagrams.diagramid=udiagrams.diagramid';
  console.log(sql);

  var list = [];
  db.QuerySql(sql, function(err, result) {
    if (err) {
      console.log(err);
    }
  
    for (var i=0; i<result.length; i++) {
      var t = {title: result[i]['title'], id: result[i]['diagramid']};
      list.push(t);
    }

    callback(list);
  });
}

exports.newdiagram = newdiagram;
exports.deldiagram = deldiagram;
exports.getmodel   = getmodel;
exports.savemodel  = savemodel;
exports.getDiagramList  = getDiagramList;

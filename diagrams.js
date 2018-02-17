


var g_user_models = {};
var g_models = {};
var g_id     = 100000000;

var model = { "class": "go.TreeModel", "nodeDataArray": [ {"key":0, "text":"Mind Map", "loc":"0 0", brush: "lightgreen"}]};

function newdiagram(user, title) {
  // 多任务是否可能共同访问？
  g_id = g_id + 1;
  var id = g_id;
  var info = {title: title, id: id};
  if (user in g_user_models) {
  } else {
    g_user_models[user] = [];
  }

  g_user_models[user].push(info); 
  return id;
}
function deldiagram(user, id) {
  if (user in g_user_models) {
    for (var i=0; i<g_user_models[user].length; i++) {
      if (g_user_models[user][i].id == id) {
        // 删除ID
        delete g_user_models[user][i];
      }
    }
  }

  if (id in g_models) {
    // 删除此设计
    delete g_models[id];
  }
}
function getmodel(id) {
  console.log("in getmodel: id="+id);
  if (id in g_models) {
    return g_models[id];
  } else {
    console.log("not found!");
    return model;
  }
}
function savemodel(id, model_new) {
  console.log("in savemodel: id="+id);
  g_models[id] = model_new;
}
function getDiagramList(user) {
  // 查询用户拥有的设计信息
  //  名称、ID
  if (user in g_user_models) {
    if (g_user_models[user][0] == null) {
      return [];
    }
    return g_user_models[user];
  } else {
    return [];
  }
}

exports.newdiagram = newdiagram;
exports.deldiagram = deldiagram;
exports.getmodel   = getmodel;
exports.savemodel  = savemodel;
exports.getDiagramList  = getDiagramList;

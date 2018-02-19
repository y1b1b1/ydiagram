var async = require("async");
var diagrams = require('./diagrams');


var TestCases = [];

var new_id = 0;

// 新建流图
function newdiagram(callback) {
  diagrams.newdiagram('bobo', 'test2', function(id) {
    console.log(id);
    if (id == -1) {
      console.log('new diagram fail!');
      
    } else {
      console.log('new diagram success!');
      new_id = id;
      callback(null, "newdiagram");
    }
  });
}
TestCases.push(newdiagram);
TestCases.push(newdiagram);

// 获取用户列表
function getDiagramList(callback) {
  diagrams.getDiagramList('bobo', function(list) {
    console.log(list);
    callback(null, "getDiagramList");
  });
}
TestCases.push(getDiagramList);

// 获取模型数据
function getmodel(callback) {
  diagrams.getmodel('bobo', new_id,  function(model) {
    console.log(model);
    callback(null, 'getmodel');
  });
}
TestCases.push(getmodel);

// 修改模型数据
function savemodel(callback) {
  var model = { "class": "go.TreeModel", "nodeDataArray": [ {"key":0, "text":"Mind Map222", "loc":"0 0", brush: "lightgreen"}]};
  diagrams.savemodel('bobo', new_id, JSON.stringify(model), function(result) {
    console.log("Savemodel:"+result);
    callback(null, 'savemodel');
  });
}
TestCases.push(savemodel);
TestCases.push(getmodel);

function deldiagram(callback) {
  diagrams.deldiagram('bobo', new_id, function(result) {
    console.log("deldiagram:"+result);
    callback(null, 'deldiagram');
  });
}
TestCases.push(deldiagram);
TestCases.push(getDiagramList);


async.series(TestCases, function (error, result) {
    console.log(result);
});



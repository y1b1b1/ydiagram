
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ybb19820605',
  database : 'ydiagrams'
});

// 数据库连接  
connection.connect();

// 提供一个基础服务接口
function QuerySql(sql, callback) {
  connection.query(sql,callback);
}


exports.QuerySql = QuerySql;

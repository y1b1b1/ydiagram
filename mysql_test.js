var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ybb19820605',
  database : 'test'
});
 
connection.connect();
 
var  sql = 'SELECT MAX(diagramid) FROM test2';
//var sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='test' AND TABLE_NAME='users'"
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
       console.log(result[0]['MAX(diagramid)']);
});


//sql = 'SELECT * FROM 

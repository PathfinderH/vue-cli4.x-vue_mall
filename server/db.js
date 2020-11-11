/*
    封装操作数据库的通用API
*/
const mysql = require('mysql');
exports.base = (sql, data, callback) => {
    //创建数据库连接
    const connection = mysql.createConnection({
        host: 'localhost', //数据库所在的服务器的域名或者IP地址
        user: 'root', //数据库账号
        password: '991011', //数据库密码
        database: 'vue_mall' //数据库名称
    });
    //执行连接操作
    connection.connect();
    //操作数据库
    connection.query(sql, data, (error, results, fields) => {
        if (error) throw error;
        callback(results);
    });
    //关闭数据库
    connection.end();
}
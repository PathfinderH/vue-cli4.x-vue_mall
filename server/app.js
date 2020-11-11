const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js')
const app = express();
const host = '192.168.1.111';
const port = 3000;

// 处理静态资源
app.use(express.static('public'))

// 处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 处理跨域
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With", 'Content-Type');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(router);

app.listen(port, host, () => {
    console.log('running...');
})
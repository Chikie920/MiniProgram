const express = require('express');
// const fs = require('fs');
const date = require('date-and-time');
const https = require('https');
const http = require('http');
// const cors = require('cors');
const router = require('./route.js');

const app = express();

// app.use(express.static('./public')); // 托管公共访问目录
app.use(express.urlencoded({ extended: false })); // 解析json中间件
app.use(router); // 注册路由
// app.use(cors()); // 跨域中间件

// const options = {
//   key: fs.readFileSync('privkey.key'),
//   cert: fs.readFileSync('fullchain.pem')
// }; // ssl配置

// http.createServer((req, res)=>{
//     res.writeHead(307, { "Location": "https://" + req.headers.host + req.url });
//     res.end();
// }).listen(80, ()=>{
//     console.log(date.format(new Date(), 'YYYY-MM-DD HH:mm:ss') + ' WebServer Listen At 80 Port...');
// });

// https.createServer(app).listen(443, ()=>{
//     console.log(date.format(new Date(), 'YYYY-MM-DD HH:mm:ss') + ' WebServer Listen At 443 Port...');
// });

app.listen(80, ()=>{
    console.log('listing..');
});
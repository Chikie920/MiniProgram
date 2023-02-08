const express = require('express');
const https = require('https');

const app = express();
app.use(express.urlencoded({ extended: false })); // 解析json中间件

const appid = 'wxe2e77a6b1b9f1b16';//小程序的appid
const appSecret = 'f69b786500165567e0e5059c07342973';// 小程序的$appSecret
var jscode = '';

exports.get_user_id = (req, res)=>{
    jscode = req.body.code; // 获取用户id
    var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${jscode}&grant_type=authorization_code`;
    https.get(url, (ans)=>{
        var data = '';
        ans.on('data', (chunk)=>{
            data+=chunk;
        });
        ans.on('end', ()=>{
            res.send(data);
        });
    });
};
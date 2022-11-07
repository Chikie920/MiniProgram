const Client = require('./mongodb_init.js');

const client = Client.init(); // 初始化数据库
const db = client.db('airtourplan');
const user_data = db.collection('user_data');
user_data.find({}).toArray((err, res)=>{
    if(err){
        throw err;
    }
    console.log(res);
    client.close();
});

// 匹配 客户端传入的openid 返回 部分信息
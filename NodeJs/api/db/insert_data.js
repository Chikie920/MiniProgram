const Client = require('./mongodb_api.js');

async function insert_data(req, res){
    const db = Client.init(); // 初始化数据库
    const collection_name = req.body.collection_name; // 获取请求表名
    const data = JSON.parse(req.body.data); // 获取匹配条件json
    await Client.insert(db, collection_name, data);
    res.end();
}

module.exports = {
    insert_data
}
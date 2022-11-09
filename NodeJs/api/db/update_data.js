const Client = require('./mongodb_api.js');

async function update_data(req, res){
    const db = Client.init(); // 初始化数据库
    const collection_name = req.body.collection_name; // 获取请求表名
    const march = req.body.march; // 获取匹配条件json
    const update_data = req.body.update_data; // 获取更新数据json
    console.log(JSON.parse(march));
    console.log(JSON.parse(update_data));
    await Client.update(db, collection_name, march, update_data);
}

module.exports = {
    update_data
}
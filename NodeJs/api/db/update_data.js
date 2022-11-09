const Client = require('./mongodb_api.js');

async function update_data(req, res){
    const db = Client.init(); // 初始化数据库
    const collection_name = req.body.collection_name; // 获取请求表名
    const march = JSON.parse(req.body.march);
    const update_data = JSON.parse(req.body.update_data);
    // console.log(march);
    // console.log(JSON.parse(march));
    // console.log(update_data);
    await Client.update(db, collection_name, march, update_data);
}

module.exports = {
    update_data
}
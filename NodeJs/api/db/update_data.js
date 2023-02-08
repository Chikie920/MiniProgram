const Client = require('./mongodb_api.js');

async function update_data(req, res){
    const db = Client.init(); // 初始化数据库
    const collection_name = req.body.collection_name; // 获取请求表名
    const march = JSON.parse(req.body.march); // 获取匹配条件json
    const update_data = JSON.parse(req.body.update_data); // 获取更新数据json
    // console.dir(req.body, {depth:null});
    // console.dir(JSON.parse(march), {depth:null});
    // console.dir(JSON.parse(update_data), {depth:null});
    await Client.update(db, collection_name, march, update_data);
    res.end();
}

module.exports = {
    update_data
}
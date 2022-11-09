const Client = require('./mongodb_api.js');

async function get_data(req, res){
    const db = Client.init(); // 初始化数据库
    const collection_name = req.body.collection_name; // 获取请求表名
    const keys = Object.keys(req.body).slice(1);
    const values = Object.values(req.body).slice(1);
    const options = {};
    keys.forEach((field, index) => {
        options[field] = values[index];
     });
    console.log(options);
    const user_data = await get_db_data(db, collection_name, options);
    res.send(user_data);
}

async function get_db_data(db, collection_name, options){
    const ans = await Client.select(db, collection_name, options);
    return ans;
}

module.exports = {
    get_data
}
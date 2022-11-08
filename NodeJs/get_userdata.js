const Client = require('./mongodb_api.js');

const client = Client.init(); // 初始化数据库
const db = client.db('airtourplan');

async function get_data(req, res){
    const openid = req.body.openid;
    const user_data = await get_db_data(openid);
    // console.log(user_data);
    res.send(user_data);
}

async function get_db_data(openid){
    var ans = await Client.select(db, 'user_data', {'_openid': openid});
    client.close(); // 关闭数据库连接
    return ans;
}

module.exports = {
    get_data
}
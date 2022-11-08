const { MongoClient } = require('mongodb');
const url = 'mongodb://airtourplan:yFKWM2QN3rjMkGF@43.143.193.34:27017/?authSource=admin';

const client = new MongoClient(url); // 创建连接

function init (){ // 初始化数据库连接
    client.connect(); // 连接数据库
    console.log('Mongodb Connected successfully to server');
    return client; // 返回数据库
}

async function select(db, collection_name, options){ // select操作
    // console.log(options);
    const ans = await db.collection(collection_name).find(options).toArray();
    return ans;
}

module.exports = {
    init,
    select
}
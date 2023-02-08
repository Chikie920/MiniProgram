const { MongoClient } = require('mongodb');
const url = 'mongodb://airtourplan:yFKWM2QN3rjMkGF@43.143.193.34:27017/?authSource=admin';

const client = new MongoClient(url); // 创建连接

function init (){ // 初始化数据库连接
    client.connect(); // 连接数据库
    const db = client.db('airtourplan'); // 获取数据库对象
    console.log('Mongodb connected successfully to server'+ new Date());
    return db; // 返回数据库
}

async function select(db, collection_name, options){ // select操作
    // console.log(options);
    const ans = await db.collection(collection_name).find(options).toArray();
    return ans;
}

async function update(db, collection_name, march, update_data){ // update操作
    const update_doc = {
        $set: update_data
    };
    await db.collection(collection_name).updateOne(march, update_doc);
}

async function insert(db, collection_name, data) { // insert操作
    await db.collection(collection_name).insertOne(data);
}

function destory(){
    client.close();
}

module.exports = {
    init,
    select,
    update,
    insert
}
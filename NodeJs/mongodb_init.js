const { MongoClient } = require('mongodb');
const url = 'mongodb://airtourplan:yFKWM2QN3rjMkGF@43.143.193.34:27017/?authSource=admin';

const client = new MongoClient(url);

exports.init = ()=>{
    client.connect();
    console.log('Mongodb Connected successfully to server');
    return client; // 返回程序数据库
}

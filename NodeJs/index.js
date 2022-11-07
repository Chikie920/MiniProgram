const mongodbCore = require("./mpServer/mongodb.js");
// 连接 mongodb，初始化 db
mongodbCore.init({dbName: 'mp-cloud-db'})
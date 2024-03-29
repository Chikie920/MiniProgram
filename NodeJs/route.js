const express = require('express');
const handle_openid_get = require('./api/get_openid.js'); // 获取小程序请求openid处理函数
const handle_data_get = require('./api/db/get_data.js'); // 获取用户信息处理函数
const handle_data_update = require('./api/db/update_data'); // 更改数据库信息处理函数
const handle_data_insert = require('./api/db/insert_data'); // 数据库插入数据处理函数

const router = express.Router();

router.post('/api/get_openid', handle_openid_get.get_user_id);
router.post('/api/db/get_data', handle_data_get.get_data);
router.post('/api/db/update_data', handle_data_update.update_data);
router.post('/api/db/insert_data', handle_data_insert.insert_data);

module.exports = router;
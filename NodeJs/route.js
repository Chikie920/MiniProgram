const express = require('express');
const handle_openid_get = require('./api/get_openid.js'); // 获取小程序请求openid处理函数
const handle_userdata_get = require('./get_userdata.js');

const router = express.Router();

router.post('/api/get_openid', handle_openid_get.get_user_id);
router.post('/api/db/get_userdata', handle_userdata_get.get_data);

module.exports = router;
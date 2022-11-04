<?php

getOpenid();
function getOpenid() {
    $code = $_GET['code'];//小程序传来的code值
    $appid = 'wxe2e77a6b1b9f1b16';//小程序的appid
    $appSecret = 'f69b786500165567e0e5059c07342973';// 小程序的$appSecret
    $wxUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code';
    $getUrl = sprintf($wxUrl, $appid, $appSecret, $code);//把appid，appsecret，code拼接到url里
    $result = curl_get($getUrl);//请求拼接好的url
    $wxResult = json_decode($result, true);
    if (empty($wxResult)) {
        echo '获取openid时异常, 微信内部错误';
    } else {
        $loginFail = array_key_exists('errcode', $wxResult);
        if ($loginFail) {//请求失败
            var_dump($wxResult);
        } else {//请求成功
            // $openid = $wxResult['openid'];
            echo json_encode($wxResult);
        }
    }
}

//php请求网络的方法
function curl_get($url, &$httpCode = 0) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    //不做证书校验,部署在linux环境下请改为true
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    $file_contents = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $file_contents;
}

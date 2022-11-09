// app.js

App({
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    naviHeight: 0,
    openid: '',
    avatar_url: '',
    like_list: [],
    lang: 0
  },

  onLaunch(){
    let windowInfo = wx.getWindowInfo();
    this.globalData.screenWidth = windowInfo.screenWidth;
    this.globalData.screenHeight = windowInfo.screenHeight;
    this.globalData.naviHeight = wx.getWindowInfo().statusBarHeight;
  
    wx.cloud.init();
    var that = this;
    wx.login({
      success (res) {
        // console.error('login code'+res.code);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://airtourplan.com/api/get_openid',
            data: {
              code: res.code,
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success (res) {
              that.globalData.openid = res.data.openid; // 成功获取openid
              // console.error(that.globalData.openid);
              wx.request({
                url: 'https://airtourplan.com/api/db/get_data',
                data: {
                  collection_name: 'user_data', 
                  _openid: that.globalData.openid
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success(res){
                  if(res.data.length == 0){
                    wx.redirectTo({
                      url: '/pages/login/login'
                    });
                  } else {
                    that.globalData.avatar_url = res.data[0].avatar_url;
                    if(res.data[0].like!=undefined){
                      that.globalData.like_list = res.data[0].like;
                    }
                  }
                }
              })
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

  }
})

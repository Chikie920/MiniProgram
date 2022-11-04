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
  
    var that = this;
    wx.cloud.init();
    const db = wx.cloud.database();
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://airtourplan.com/get_openid.php',
            data: {
              code: res.code
            },
            success (res) {
              console.error(res);
              that.globalData.openid = res.data.openid; // 成功获取openid
              db.collection('user_data').where({
                      _openid: that.globalData.openid
                    }).get({
                      success(res){ // 成功获取数据库
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
                    });
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

  }
})

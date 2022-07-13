// app.js

App({

  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    naviHeight: 0,
    openid: '',
    avatar_url: '',
  },

  onLaunch(){
    wx.cloud.init({
      env: 'testspace-0gb1qpjobc4b527d'
    });
    let windowInfo = wx.getWindowInfo();
    this.globalData.screenWidth = windowInfo.screenWidth;
    this.globalData.screenHeight = windowInfo.screenHeight;
    this.globalData.naviHeight = wx.getWindowInfo().statusBarHeight;
  
    var that = this;
    const db = wx.cloud.database();
    wx.cloud.callFunction({
        name: 'get_openid',
        success(res){ // 成功获取openid
          that.globalData.openid = res.result.openid;
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
                    }
                  }
                });
        }
    });
  }
})

// app.js
App({

  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    naviHeight: 0,
    openid: '',
    avatar_url: ''
  },

  onLaunch(){
    wx.cloud.init({
      env: 'testspace-0gb1qpjobc4b527d'
    })
    let windowInfo = wx.getWindowInfo();
    this.globalData.screenWidth = windowInfo.screenWidth;
    this.globalData.screenHeight = windowInfo.screenHeight;
    this.globalData.naviHeight = wx.getWindowInfo().statusBarHeight;
  }

})

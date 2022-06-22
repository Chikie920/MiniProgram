// app.js
App({

  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    naviHeight: 0
  },

  onLaunch(){
    let windowInfo = wx.getWindowInfo();
    this.globalData.screenWidth = windowInfo.screenWidth;
    this.globalData.screenHeight = windowInfo.screenHeight;
    this.globalData.naviHeight = wx.getWindowInfo().statusBarHeight;
  }

})

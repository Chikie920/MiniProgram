// index.js
const app = getApp();

Page({
  data:{
    naviHeight: app.globalData.naviHeight,
    screenHeight: app.globalData.screenHeight-app.globalData.naviHeight,
    screenWidth: app.globalData.screenWidth,
    lang: ["Lang, ZH", "Lang, EN"],
    lang_change: 0
  },
  change_lang: function(event) {
    var change = (this.data.lang_change+1)%2;
    this.setData({
      lang_change: change
    })
  }
})

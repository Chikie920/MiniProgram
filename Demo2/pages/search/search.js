//index.js
const app = getApp();
var WxSearch = require('wxSearchView.js');

Page({
  data: {
    naviHeight: app.globalData.naviHeight,
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight
  },

  // 搜索栏
  onLoad: function (option) {
    var place_name = [];
    var place_list = JSON.parse(option.place_list);
    var i;
    for(i=0; i<place_list.length; ++i){
      place_name.push(place_list[i].name);
    }
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      [], // 热点搜索推荐，[]表示不使用
      place_name,
      // ['湖北', '湖南', '北京', "南京"],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 跳转
    wx.redirectTo({
      url: '/pages/detail/detail?place_name='+value
    })
  },

  // 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 跳转
    wx.navigateBack({
      delta: 1,
    })
  }

})

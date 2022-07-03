// pages/add_plan/add_plan.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviHeight: app.globalData.naviHeight,
    screenHeight: app.globalData.screenHeight-app.globalData.naviHeight,
    screenWidth: app.globalData.screenWidth,
    show: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return `${value}日`;
    },
    select_year: "",
    select_month: "",
    select_day: "",
  },

  showPopup: function() {
    this.setData({
      show: true
    });
  },

  onClose: function() {
    this.setData({
      show: false
    });
  },

  select_over: function() {
    this.onClose();
  },

  select_cancel: function() {
    this.onClose();
  },

  get_date: function(event) {
    let date = event.detail.getValues();
    this.setData({
      select_year: date[0],
      select_month: date[1],
      select_day: date[2]
    });
  },

  commit: function() {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
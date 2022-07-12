// pages/setting/setting.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviHeight: app.globalData.naviHeight,
    screenHeight: app.globalData.screenHeight-app.globalData.naviHeight,
    screenWidth: app.globalData.screenWidth,
    user_openid: '',
    avatar_url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.cloud.callFunction({
      name: 'get_openid',
      success(res) {
        // 获取openid,感觉有些冗余，考虑使用全局变量替换
        db.collection('user_data').where({
          _openid: res.result.openid
        }).get({
          success(res) {
            that.setData({
              user_openid: res.result.openid,
              avatar_url: res.data[0].avatar_url
            });
            console.error(that.data);
          }
        });
        // 获取用户头像
      }
    });
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
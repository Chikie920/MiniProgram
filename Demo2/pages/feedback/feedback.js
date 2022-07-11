// pages/feedback/feedback.js
import Toast from '@vant/weapp/toast/toast';

const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviHeight: app.globalData.naviHeight,
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight,
    input_value: ''
  },

  input(event) {
    this.setData({
      input_value: event.detail
    });
  },

  commit() {
    if (this.data.input_value != ''&&this.data.input_value.length>20) {
      console.log(this.data.input_value.length)
      db.collection('feedback').add({
        data:{
          feedback: this.data.input_value
        }
      });
    } else {
      Toast('内容过于简单，请达到20字以上');
    }
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
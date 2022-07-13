// pages/like/like.js
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
    openid: app.globalData.openid,
    text_status: 1,
    like_list: [],
    change: 0
  },

  onChange(event){
    console.error(event);
    var get_id = event.target.id;
    var new_list=this.data.like_list;
    new_list.splice(get_id, 1);
    db.collection('user_data').where({
      _openid: this.data.openid
    }).update({
      data:{
        like: new_list
      }
    });
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    db.collection('user_data').where({
      _openid: this.data.openid
    }).get({
      success(res){
        that.setData({
          like_list: res.data[0].like
        });
        if(that.like_list!=[]){
          that.data.text_status = 0;
        }
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
    this.onLoad();
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
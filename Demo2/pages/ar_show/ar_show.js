// pages/ar_show/ar_show.js
var wxPano = requirePlugin("wxPano");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: "5615c1445c86934526ce9c02ea2571e7",
  },
  setCameraLookAt:function(){ // 还原视角
    wxPano.setCameraLookAt({
      x: 0.5, y: 0.5
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wxPano.onReady = function () { //wxPano初始化完成后会触发此事件
    }
    wxPano.config({
    panolist:[{
      name:"tupian",
      src: "https://www.airtourplan.com/sources/ar_imgs/1.jpg",
    }],
    request:wx.request,
    loader:"GLLoader",
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
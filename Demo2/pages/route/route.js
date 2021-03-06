// pages/route/route.js
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviHeight: app.globalData.naviHeight,
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight,
    longitude: 0,
    latitude: 0,
    dialog_show: "",
    input_list: [1]
  },

  add_inputer() {
    var old = this.data.input_list;
    if(old.length<=3){
      old.push(1);
      this.setData({
        input_list: old
      });
    } else {
      Dialog.alert({
        message: '最多只能添加4个目的地哦',
      }).then(() => {
        this.dialog_show = "";
        // on close
      });
    }
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success:(res)=>{
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    }); /*获取定位*/

    // Dialog.alert({
    //   message: '您当前并不在武汉，请输入一个武汉市内地点作为起始地',
    // }).then(() => {
    //   this.dialog_show = "";
    //   // on close
    // });

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
// pages/plan/plan.js
const app = getApp();
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviHeight: app.globalData.naviHeight,
    screenHeight: app.globalData.screenHeight-app.globalData.naviHeight,
    screenWidth: app.globalData.screenWidth,
    plan_list: []
  },

  add_plan(){
    var model = JSON.stringify(this.data.plan_list);
    wx.navigateTo({
      url: '/pages/add_plan/add_plan?plan_list='+model,
    });
  },

  goto_detail(event) {
    var idx = event.currentTarget.id;
    var model = JSON.stringify(this.data.plan_list[idx].activity);
    wx.navigateTo({
      url: '/pages/plan_detail/plan_detail?plan_name='+this.data.plan_list[idx].plan_name+'&plan_time='+this.data.plan_list[idx].time+'&plan_activities='+model,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      var that = this;
      db.collection('user_data').where({_openid: app.globalData.openid}).get({
        success(res) {
          that.setData({
            plan_list: res.data[0].plan_list
          });
        }
      });
    // console.error(app.globalData.plan_list, this.data.plan_list.activity)
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
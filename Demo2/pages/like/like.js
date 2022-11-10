// pages/like/like.js
const app = getApp();

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
    change: 0,
    lang: 0
  },

  onChange(event){
    var get_id=event.target.id;
    var new_list=this.data.like_list;
    var index = this.data.like_list.indexOf(get_id);
    new_list.splice(index, 1);

    wx.request({
      url: 'http://localhost:80/api/db/update_data',
      data: {
        collection_name: 'user_data',
        march: JSON.stringify({_openid: this.data.openid}),
        update_data: JSON.stringify({like: new_list})
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    });
    // 获取主页热门景点

    // db.collection('user_data').where({
    //   _openid: this.data.openid
    // }).update({
    //   data:{
    //     like: new_list
    //   }
    // }); // 更新数据库
    // wx.redirectTo({
    //   url: '/pages/like/like',
    // })
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      like_list: app.globalData.like_list,
      lang: app.globalData.lang
    });

    if(this.data.like_list!=[]){
      this.setData({
        text_status: 0
      });
    }
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
    // this.onLoad();
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
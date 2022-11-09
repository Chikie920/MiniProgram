// pages/places/place.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviHeight: app.globalData.naviHeight,
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight,
    place_list: []
  },

  goto_search() {
    var model = JSON.stringify(this.data.place_list);
    wx.navigateTo({
      url: '/pages/search/search?place_list='+model,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    wx.request({
      url: 'https://airtourplan.com/api/db/get_data',
      data: {
        collection_name: 'place_detail'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        this.setData({
          place_list: res.data
        });
      }
    });
    // 获取主页景点列表
    // db.collection('place_detail').where({}).get({
    //   success:(res)=>{
    //     this.setData({
    //       place_list: res.data
    //     });
    //   }
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
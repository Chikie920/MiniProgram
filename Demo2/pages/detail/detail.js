// pages/detail/detail.js
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
    place_name: '',
    place_loc: '',
    detail: '',
    img_counts: 0,
    img_list: [],
    img_header_url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      place_name: options.place_name
    });
    // 上一页面传参

    db.collection('place_detail').where({
      name: this.data.place_name
    }).get({
      success:(res)=>{
        this.setData({
          detail: res.data[0].detail,
          img_counts: res.data[0].img_counts,
          img_header_url: res.data[0].url_header,
          place_loc: res.data[0].loc
        });
        let i;
        let list=[];
        for(i=0; i<this.data.img_counts; ++i){
          list.push(i);
        };
        console.log(list)
        this.setData({
          img_list: list
        });
      }
    })

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
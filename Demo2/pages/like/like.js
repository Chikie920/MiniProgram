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
    text_status: 0,
    like_list: [],
    change: 0,
    lang: 0
  },

  onChange(event){
    var that = this;
    var get_id = event.target.id;
    // console.error("***** "+get_id);
    var new_list = this.data.like_list;
    var index;
    new_list.forEach((item, idx)=>{
      item.forEach((element)=>{
        if(element==get_id) {
          index = idx;
        }
      });
    });
    // console.error(new_list[1]);
    // var index = this.data.like_list.indexOf(get_id);
    // console.error(index);
    new_list.splice(index, 1);
    // console.error(new_list);
    app.globalData.like_list = new_list;
    wx.request({
      url: 'https://www.airtourplan.com/api/db/update_data',
      data: {
        collection_name: 'user_data',
        march: JSON.stringify({_openid: app.globalData.openid}),
        update_data: JSON.stringify({like: app.globalData.like_list})
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        // console.error(app.globalData.like_list);
        // that.onLoad();
      },
      fail(res){
        console.error("****更新失败!****");
      }
    });
    this.onLoad();
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    wx.getStorage({
      key: 'lang',
      success:(res)=> {
        this.setData({
          lang: res.data
        });
      }
    });

    this.setData({
      like_list: app.globalData.like_list,
    });
    // console.error(this.data.like_list);

    if(this.data.like_list.length==0){
      this.setData({
        text_status: 1
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
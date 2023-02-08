// pages/login/login.js
import Dialog from '@vant/weapp/dialog/dialog';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: '',
    user_headerimg: ''
  },

  login() {
    let that = this;
    wx.getUserProfile({
      desc: '必须授权才可以继续使用',
      success(res) {
        that.setData({
          user_name: res.userInfo.nickName,
          user_headerimg: res.userInfo.avatarUrl
        });

        // 坑 小程序传递json 务必使用JSON.stringify将Json对象转换为json字符串
        wx.request({
          url: 'https://airtourplan.com/api/db/insert_data',
          // url: 'https://www.airtourplan.com/api/db/insert_data', 挂壁了
          data: {
            collection_name: 'user_data',
            data: JSON.stringify(
              {
                _openid:app.globalData.openid,
                avatar_url:that.data.user_headerimg,
                name:that.data.user_name
            }
            )
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:(res)=>{
            app.globalData.avatar_url = that.data.user_headerimg; // 保存头像url
            wx.redirectTo({
              url: '/pages/index/index'
            });
          }
        });

        // db.collection('user_data').add({
        //   data:{
        //     name: that.data.user_name,
        //     avatar_url: that.data.user_headerimg
        //   },
        //   success(res) {
        //     app.globalData.avatar_url = that.data.user_headerimg; // 保存头像url
        //     wx.redirectTo({
        //       url: '/pages/index/index'
        //     });
        //   }
        // });
        // console.log(that.data)
      },
      fail(res) {
        Dialog.alert({
          message: '授权失败，小程序将退出',
        }).then(() => {
          // on close
        });
      }
    })
  },

  onclose() {
    wx.exitMiniProgram();
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
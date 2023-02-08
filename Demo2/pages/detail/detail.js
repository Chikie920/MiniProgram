// pages/detail/detail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviHeight: app.globalData.naviHeight,
    screenHeight: app.globalData.screenHeight-app.globalData.naviHeight,
    screenWidth: app.globalData.screenWidth,
    like_list: [],
    place_name: '',
    place_name_en: '',
    place_loc: '',
    detail: '',
    detail_en: '',
    img_counts: 0,
    img_list: [],
    img_header_url: '',
    islike: 0,
    lang: 0
  },

  showImg(e) { // 显示大图
    var url_list = new Array();
    const head_url = this.data.img_header_url;
    const N = this.data.img_counts;
    for(var i=0; i<N; ++i){
      url_list[i] = head_url+i+".jpg";
    }
    var current_url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current_url,
      urls: url_list
    })
  },

  onChange_unlike(event){
    var new_list=app.globalData.like_list;
    var index;
    new_list.forEach((item, idx)=>{
      item.forEach((element)=>{
        if(element==this.data.place_name) {
          index = idx;
        }
      });
    });
    // new_list.splice(new_list.indexOf(this.data.place_name), 1);
    new_list.splice(index, 1);
    app.globalData.like_list = new_list;
    // app.globalData.like_list.splice(app.globalData.like_list.indexOf(this.data.place_name), 1);

    wx.request({
      url: 'https://airtourplan.com/api/db/update_data',
      data: {
        collection_name: 'user_data',
        march: JSON.stringify({_openid: app.globalData.openid}),
        update_data: JSON.stringify({like: app.globalData.like_list})
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    });
    // 更新用户喜爱列表

    // db.collection('user_data').where({_openid: this.data.openid}).update({
    //   data: {
    //     like:  app.globalData.like_list
    //   }
    // });
    this.onLoad();
  },

  onChange_like(event){
    // console.error('applist',app.globalData.like_list);
    var new_list=app.globalData.like_list;
    new_list.push([this.data.place_name, this.data.place_name_en]);
    app.globalData.like_list = new_list;
    // console.error(new_list);
  
    wx.request({
      url: 'https://airtourplan.com/api/db/update_data',
      data: {
        collection_name: 'user_data',
        march: JSON.stringify({_openid: app.globalData.openid}),
        update_data: JSON.stringify({like: app.globalData.like_list})
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    });

    // db.collection('user_data').where({_openid: this.data.openid}).update({
    //   data: {
    //     like: app.globalData.like_list
    //   }
    // });
    this.onLoad();
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
      place_name: options.place_name,
      like_list: app.globalData.like_list,
    }); 
    // 参数传入与赋值

    wx.request({
      url: 'https://airtourplan.com/api/db/get_data',
      data: {
        collection_name: 'place_detail',
        name: this.data.place_name
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        this.setData({
          detail: res.data[0].detail,
          img_counts: res.data[0].img_counts,
          img_header_url: res.data[0].url_header,
          place_loc: res.data[0].loc,
          place_name_en: res.data[0].name_en,
          detail_en: res.data[0].detail_en
        });
        let i;
        let list=[];
        for(i=0; i<this.data.img_counts; ++i){
          list.push(i);
        };
        this.setData({
          img_list: list
        });
      }
    });
    // 获取景点详情信息

    // db.collection('place_detail').where({
    //   name: this.data.place_name
    // }).get({
    //   success:(res)=>{
    //     this.setData({
    //       detail: res.data[0].detail,
    //       img_counts: res.data[0].img_counts,
    //       img_header_url: res.data[0].url_header,
    //       place_loc: res.data[0].loc,
    //       place_name_en: res.data[0].name_en
    //     });
    //     let i;
    //     let list=[];
    //     for(i=0; i<this.data.img_counts; ++i){
    //       list.push(i);
    //     };
    //     this.setData({
    //       img_list: list
    //     });
    //   }
    // });

    // console.error(this.data.like_list.indexOf(this.data.place_name), this.data);
    var temp_list = this.data.like_list.flat(); // 转为一维数组便于下面查找下标
    if(temp_list.indexOf(this.data.place_name)!=-1){
      this.setData({
        islike: 1
      });
      // console.error('修改', this.data);
    } //在喜爱列表中
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
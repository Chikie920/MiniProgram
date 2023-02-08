// pages/add_plan/add_plan.js
import Dialog from '@vant/weapp/dialog/dialog';

const app = getApp();
var activities = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviHeight: app.globalData.naviHeight,
    screenHeight: app.globalData.screenHeight-app.globalData.naviHeight,
    screenWidth: app.globalData.screenWidth,
    show: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}`;
      }
      if (type === 'month') {
        return `${value}`;
      }
      return `${value}`;
    },
    select_year: "",
    select_month: "",
    select_day: "",
    add_list: [1],
    plan_title: '',
    date: '',
    over: [0, 0],
    plan: {plan_name: '', activity: [], time: ''},
    old_plan: []
  },

  get_title(event) {
    var old_over = this.data.over;
    if(event.detail!="") {
      old_over[1] = 1;
      this.setData({
        plan_title: event.detail,
        over: old_over
      });
    } else {
      old_over[1] = 0;
      this.setData({
        plan_title: '',
        over: old_over
      });
    }
  },

  showPopup: function() {
    this.setData({
      show: true
    });
  },

  onClose: function() {
    this.setData({
      show: false
    });
  },

  select_over: function() {
    this.onClose();
  },

  select_cancel: function() {
    this.onClose();
  },

  get_date: function(event) {
    let date = event.detail.getValues();
    var old_over = this.data.over;
    old_over[0] = 1;
    this.setData({
      select_year: date[0],
      select_month: date[1],
      select_day: date[2],
      date: date[0]+'年'+date[1]+'月'+date[2]+'日',
      over: old_over
    });
  },

  commit: function() {
    var new_activities = [];
    var i;
    for(i=0; i<activities.length; ++i){
      if(activities[i]!=''){
        new_activities.push(activities[i]);
      }
    }
    if(activities.length>0&&this.data.over[0]==1&&this.data.over[1]==1){
      var plan_data = this.data.plan;
      plan_data.plan_name = this.data.plan_title;
      plan_data.activity = new_activities;
      plan_data.time = this.data.date;
      this.setData({
        plan: plan_data
      });
      // console.error(this.data.plan);
      // var addplan = [''];
      var addplan = this.data.old_plan;
      // console.error('addplan',addplan)
      addplan.push(this.data.plan);
      wx.request({
        url: 'https://airtourplan.com/api/db/update_data',
        data: {
          collection_name: 'user_data',
          march: JSON.stringify({_openid: app.globalData.openid}),
          update_data: JSON.stringify({plan_list: addplan})
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success (res) {
          wx.navigateBack({
            delta: 1
          });
        }
      });
      // db.collection('user_data').where({
      //   _openid: app.globalData.openid
      // }).update({
      //   data: {
      //     plan_list: addplan
      //   }
      // });
    } else {
      Dialog.alert({
        message: '请检查计划名、日期且至少添加一个活动',
      }).then(() => {
        // on close
      });
    }
    // console.error(this.data.plan_title, this.data.date, activities);
  },

  add_inputer() {
    var old = this.data.add_list;
    if(old.length < 6) {
      old.push(1);
      this.setData({
        add_list: old
      });
      activities.push('');
    } else {
      Dialog.alert({
        message: '无法继续添加',
      }).then(() => {
        // on close
      });
    }

  },

  delete_inputer(event) {
    var index = event.currentTarget.id[6];
    var old = this.data.add_list;
    old.splice(index, 1);
    activities.splice(index, 1);
    // console.error(index, this.data.add_list);
    this.setData({
      add_list: old
    });
  },

  get_input(event) {
    var index = event.currentTarget.id;
    var text = event.detail;
    if(text!=""){
      activities[index] = text;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.error(options, options.plan_list.length);
    if(options.plan_list.length!=0||options.plan_list!=undefined){
      var plan_list_parse = JSON.parse(options.plan_list)
      this.setData({
        old_plan: plan_list_parse
      });
      console.error(this.data.old_plan)
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
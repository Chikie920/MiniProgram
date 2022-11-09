// index.js
const app = getApp();

let key = 'JOSBZ-R3KW3-YMN3J-33XBY-E67QH-CCBJD';  //使用在腾讯位置服务申请的key
let referer = 'Demo2';   //调用插件的app的名称
let endPoint = JSON.stringify({  //终点
  'name': '武汉',
  'latitude': 30.52,
  'longitude': 114.31
});

Page({
  data:{
    naviHeight: app.globalData.naviHeight,
    screenHeight: app.globalData.screenHeight-app.globalData.naviHeight,
    screenWidth: app.globalData.screenWidth,
    lang: ["Lang, ZH", "Lang, EN"],
    lang_change: 0,
    city_code: '101200101',
    weather_api_url: 'https://devapi.qweather.com/v7/weather/now?',
    key: 'e26c29f5c2a441f48d633ccc508d66c3',
    weather: 'qing',
    weather_list: ['冰雹', '多云', '雷暴', '雷阵雨', '晴', '雾', '小雨', '雪', '扬尘', '阴', '中雨', '大雨', '暴雨'],
    places_card_data: [],
    ar_data: []
  },

  route() {
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },

  change_lang: function(event) {
    var change = (this.data.lang_change+1)%2;
    this.setData({
      lang_change: change
    });
    wx.setStorage({
      key:"lang",
      data:change
    });
    app.globalData.lang = change;
    this.onLoad();
  },

  onLoad(options) {
    wx.getStorage({
      key: 'lang',
      success:(res)=> {
        this.setData({
          lang_change: res.data
        });
      }
    });

    wx.request({
      url: this.data.weather_api_url+'key='+this.data.key+'&location='+this.data.city_code,
      success:(res)=> {
        // console.error("********")
        // console.error(res)
        var text = res.data.now.text;
        var weather_list_py = ['bingbao', 'duoyun', 'leibao', 'leizhenyu', 'qing', 'wu', 'xiaoyu', 'xue', 'yangcen', 'yin', 'zhongyu', 'dayu', 'baoyu'];
        var idx = this.data.weather_list.indexOf(text);
        if(idx!=-1){
          if( /雪/.test(text) ){ // 带雪的天气
            this.setData({
              weather: weather_list_py[7]
            });
          } else if( /雷/.test(text) ){ // 带雷的天气
            this.setData({
              weather: weather_list_py[2]
            });
          } else {
            this.setData({
              weather: weather_list_py[idx]
            });
          }
        } else {
          console.error('需要添加天气: ', text);
        }
      },

    });
    // 获取天气情况
    wx.request({
      url: 'https://airtourplan.com/api/db/get_data',
      data: {
        collection_name: 'main_place_info'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        this.setData({
          places_card_data : res.data
        });
      }
    });
    // 获取主页热门景点

    wx.request({
      url: 'https://airtourplan.com/api/db/get_data',
      data: {
        collection_name: 'main_ar_info'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        this.setData({
          ar_data : res.data
        });
      }
    });
    // 获取主页热门全景

  }

})

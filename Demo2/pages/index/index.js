// index.js
const app = getApp();
const db = wx.cloud.database();

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
    weather: '晴',
    weather_list: ['冰雹', '多云', '雷暴', '雷阵雨', '晴', '雾', '小雨', '雪', '扬尘', '阴', '中雨', '大雨', '暴雨'],
    places_card_data: [],
    ar_data: []
  },
  change_lang: function(event) {
    var change = (this.data.lang_change+1)%2;
    this.setData({
      lang_change: change
    });
  },

  onLoad(options) {
    wx.request({
      url: this.data.weather_api_url+'key='+this.data.key+'&location='+this.data.city_code,
      success:(res)=> {
        let text = res.data.now.text;
        if(this.data.weather_list.indexOf(text)!=-1){
          if( /雪/.test(text) ){ // 带雪的天气
            this.setData({
              weather: '雪'
            });
          } else if( /雷/.test(text) ){ // 带雷的天气
            this.setData({
              weather: '雷暴'
            });
          } else {
            this.setData({
              weather: text
            });
          }
        } else {
          console.error('需要添加天气: ', text);
        }
      },

    });

    db.collection('main_place_info').where({}).get({
      success:(res)=>{
        this.setData({
          places_card_data : res.data
        })
      }
    });

    db.collection('main_ar_info').where({}).get({
      success:(res)=>{
        this.setData({
          ar_data : res.data
        })
      }
    });

  }

})

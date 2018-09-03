//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    mainData:[],
    sliderData:[],
    scanData:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,

  },
    

  onLoad(options){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getSliderData()
  },

  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);  
    };
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
    };
    postData.order = {
      create_time:'desc'
    };
    postData.getBefore = {
      article:{
        tableName:'label',
        searchItem:{
          title:['=',['活动列表']],
          thirdapp_id:['=',[getApp().globalData.thirdapp_id]],
        },
        middleKey:'menu_id',
        key:'id',
        condition:'in',
      },
    };
    const callback = (res)=>{
     if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
        if(res.info.data.length>2){
          self.data.mainData = self.data.mainData.slice(0,2) 
        }
      }else{
        self.data.isLoadAll = true;
        api.showToast('暂无活动','fail')
      };
      wx.hideLoading();
      self.setData({
        web_mainData:self.data.mainData,
      });  
    };
    api.articleGet(postData,callback);
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  getSliderData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      title:'首页轮播图',
      thirdapp_id:'59'
    };
    const callback = (res)=>{ 
     self.data.sliderData = res;
      self.setData({
        web_sliderData:self.data.sliderData,
      });
    };
    api.labelGet(postData,callback);
  },

  scanCode(){ 
    const self = this;
    if(wx.getStorageSync('login')&&wx.getStorageSync('login').userType==0){
      wx.scanCode({
        success: (res) => {   
        console.log(res)
        wx.navigateTo({
          url:"/pages/transaction/transaction?data="+res.result,
        })
       }
      })      
    }else{
      api.showToast('请先登录','fail');
      setTimeout(function(){
        api.pathTo('/pages/login/login','redi');
      },1000);
    }

  },

})

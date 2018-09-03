//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  
  data: {

    mainData:[],
    todayMainData:[],
    searchItem:{
      type:'3',
      count:['>','0'] 
    }
  },


  onLoad(){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getTime();
    self.getTodayMainData();
  },


  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);  
    };
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.token = wx.getStorageSync('token');
    postData.searchItem = {
      type:'3',
      count:['>','0'] 
    };
    postData.order = {
      create_time:'desc',
    };
   
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
        self.setData({
          web_mainData:self.data.mainData,
          web_mainData_total:res.info.total,
        });
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
        self.setData({
          web_mainData:self.data.mainData,
          web_mainData_total:res.info.total,
        });
      };
      wx.hideLoading();
    };
    api.flowLogGet(postData,callback);
  },


  getTodayMainData(isNew){
    const self = this;
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.token = wx.getStorageSync('token');
    postData.searchItem = api.cloneForm(self.data.searchItem);
    postData.order = {
      create_time:'desc',
    }; 
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.todayMainData.push.apply(self.data.todayMainData,res.info.data);
        self.setData({
          web_todayMainData:self.data.todayMainData,
          web_todayMainData_total:res.info.total,
        });
      }else{
        self.data.isLoadAll = true;
        self.setData({
          web_todayMainData:self.data.todayMainData,
          web_todayMainData_total:res.info.total,
        });
      };      
      wx.hideLoading();
    };
    api.flowLogGet(postData,callback);
  },


  onReachBottom(){
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
  },



  getTime(){
    const self = this;
  	var timeStampStart = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
  	var timeStampEnd = 
      new Date(new Date().setHours(0, 0, 0, 0)) / 1000 + 24 * 60 * 60-1;
    self.data.searchItem.create_time = ['between',[timeStampStart,timeStampEnd]];
  }
  

 
})


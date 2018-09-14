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
    self.getComputeData();
    self.getTodayComputeData();
    self.getLessComputeData();
  },

  onshow(){
    const self = this;
    self.getTime();
    self.getTodayMainData();
    self.getComputeData();
    self.getTodayComputeData();
    self.getLessComputeData(); 
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

  getTodayComputeData(){
    const self = this;
    const postData = {};
    postData.data = {
      FlowLog:{
        compute:{
          count:'sum',
        },
        
        searchItem:{
          user_no:wx.getStorageSync('info').user_no,
          type:3,
          count:['>','0'],
          create_time:['between',[new Date(new Date().setHours(0, 0, 0, 0)) / 1000,new Date(new Date().setHours(0, 0, 0, 0)) / 1000 + 24 * 60 * 60-1]]
        }
      }
    };
    const callback = (res)=>{
      console.log(res);
      self.data.todayComputeData = res;
      self.setData({
        web_todayComputeData:self.data.todayComputeData,
      });
      wx.hideLoading();
    };
    api.flowLogCompute(postData,callback);
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
  },

  getComputeData(){
    const self = this;
    const postData = {};
    postData.data = {
      FlowLog:{
        compute:{
          count:'sum',
        },
        
        searchItem:{
          user_no:wx.getStorageSync('info').user_no,
          type:3,
          count:['>','0']
        }
      }
    };
    const callback = (res)=>{
      console.log(res);
      self.data.computeData = res;
      self.setData({
        web_computeData:self.data.computeData,
      });
      wx.hideLoading();
    };
    api.flowLogCompute(postData,callback);
  },


  getLessComputeData(){
    const self = this;
    const postData = {};
    postData.data = {
      FlowLog:{
        compute:{
          count:'sum',
        },
        
        searchItem:{
          user_no:wx.getStorageSync('info').user_no,
          type:3,
        }
      }
    };
    const callback = (res)=>{
      console.log(res);
      self.data.lessComputeData = res;
      self.setData({
        web_lessComputeData:self.data.lessComputeData,
      });
      wx.hideLoading();
    };
    api.flowLogCompute(postData,callback);
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

 
})


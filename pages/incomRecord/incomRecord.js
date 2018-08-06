//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {

    mainData:[],
    userData:[]

  },


  onLoad(){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getTime();
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
    };
    postData.order = {
      create_time:'desc',
    };
   
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      self.setData({
        web_mainData:self.data.mainData,
      });
      wx.hideLoading();
    };
    api.flowLogGet(postData,callback);
  },


  onReachBottom() {
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
  },

  getTime(){
  	var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
  	console.log(timeStamp)
  	var timeStampEnd = new Date(new Date().toLocaleDateString()).getTime();
  	console.log(timeStampEnd)
  }
  

 
})


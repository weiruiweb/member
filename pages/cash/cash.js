//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {

    mainData:[],
 
  },


  onLoad(){
    const self = this;
    self.data.year = new Date().getFullYear();
    self.data.month = new Date().getMonth()+1;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getComputeData()
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
      count:['<','0'] 
    };
    postData.order = {
      create_time:'desc',
    };
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail')
      };
      self.setData({
          web_mainData:self.data.mainData,
       });
      wx.hideLoading();
    };
    api.flowLogGet(postData,callback);
  },

 

/*  getMonthDaat(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.searchItem = {
      type:'3',
      count:['<','0']
      create_time:['between',[]] 
    };
    postData
    const callback = (res)=>{
      wx.hideLoading();
    };
    api.flowLogGet(postData,callback);
  },
*/

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
    			count:['<','0'],
          create_time:['between',[new Date(self.data.year, self.data.month - 1, 1).getTime()/1000,new Date(self.data.year, self.data.month, 0).getTime()/1000+86399]]
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





  onReachBottom(){
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
  },



/*  getTime(){
    const self = this;
  	var timeStampStart = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
  	var timeStampEnd = 
      new Date(new Date().setHours(0, 0, 0, 0)) / 1000 + 24 * 60 * 60-1;
    self.data.searchItem.create_time = ['between',[timeStampStart,timeStampEnd]];
  }*/
  

 
})


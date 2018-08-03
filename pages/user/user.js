//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    web_show:false,
    userData:[]
  },
    

  onLoad(){
    const self = this;
    self.getUserData()
  },


  onShow(){
    const self = this;
    const pass = api.checkLogin('0');
    if(pass){
      self.setData({
        web_show:true
      })
    };  
  },

  getUserData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      console.log(res);
      self.data.userData = res;
      self.setData({
        web_userData:self.data.userData,
      });
     
      wx.hideLoading();
    };
    api.userGet(postData,callback);
    
  },



  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

 

  removeStorageSync(){
    api.logOff();
  },


})

//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    web_show:false,
  
  },
    


  onLoad(){
    const self = this;
    self.getLabelData()
  },

  onShow(){
    const self = this;
    const pass = api.checkLogin('3');
    if(pass){
      self.setData({
        web_show:true
      })
    };  
  },

  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },

 

  removeStorageSync(){
    api.logOff();
  },

  getLabelData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      id:392
    };
    const callback = (res)=>{
      console.log(res.info.data.length)
      if(res.info.data.length>0){  
        self.data.labelData = res.info.data[0];
      }
      self.setData({
        web_labelData:self.data.labelData,
      });
    };
    api.labelGet(postData,callback);   
  },


})

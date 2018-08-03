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


})

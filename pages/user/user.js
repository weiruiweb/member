//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

import {Token} from '../../utils/token.js';
const token = new Token();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    web_show:false,
    userData:[]
  },
    

 




  onShow(){
    const self = this;
    self.getComputeData();
    const pass = api.checkLogin('0');
    if(pass){
      self.setData({
        web_show:true
      })
    };  
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
        }
      }
    };
    const callback = (res)=>{
      console.log(res);
      self.data.computeData = res.FlowLog.countsum;
      self.setData({
        web_computeData:self.data.computeData
      })
    };
    api.flowLogCompute(postData,callback);
  },





  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

 

  removeStorageSync(){
    api.logOff();
  },


})

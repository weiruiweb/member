//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

import {Token} from '../../utils/token.js';
var token = new Token();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    sForm:{
      login_name:'',
      password:''
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },


  submit(){
    const self = this;
    wx.setStorageSync('login',self.data.sForm);
    const callback = (res)=>{
    wx.setStorageSync('info',res.data.info);  
      console.log(res)
      if(res.data.info.behavior=='3'){
        api.pathTo('/pages/merchant/merchant','tab')
      }else{
        api.pathTo('/pages/user/user','tab')
      }
    };
    token.getToken(callback);
  },

  bindInputChange(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    self.setData({
      web_sForm:self.data.sForm,
    });
  },


  check(e){
    const self = this;
    console.log(self.data.sForm);
    if(api.checkComplete(self.data.sForm)){
      self.submit();
    }else{
      api.showToast('请填写账号密码','fail')
    };

  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'tab');
  },

})

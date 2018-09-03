//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

 

 
Page({

  data: {
    submitData:{
      password:'',
      password_new:'',
      password_new_copy:'', 
    },


  },




  onLoad(){
    const self = this;
  
  },




  passwordUpdate(){
    const self = this;
      const postData = {};
      postData.token = wx.getStorageSync('token');
      postData.searchItem = {
        user_no:wx.getStorageSync('info').user_no,
      };
      postData.data = {
        password:self.data.submitData.password_new,
      }; 
      const callback = (res) => { 
        wx.hideLoading();
        const pass = api.showToast('修改成功','fail');
        if(pass){
          setTimeout(function(){
          	api.logOff();
          },500);         
        }
      };
    api.userUpdate(postData,callback);
    
  },



  changeBind(e){
    const self = this;
    api.fillChange(e,self,'submitData');
    if(self.data.submitData.password_new&&self.data.submitData.password_new_copy){
      if(self.data.submitData.password_new!=self.data.submitData.password_new_copy){
        api.showToast('新密码不一致','fail');  
        self.data.submitData.password_new_copy = ''  
      };

      
    }; 
      self.setData({
        web_submitData:self.data.submitData
      });
  },



  submit(){
    const self = this;
    if(self.data.submitData.password != wx.getStorageSync('login').password){
      api.showToast('原密码错误','fail');
      return;
    };
    const pass = api.checkComplete(self.data.submitData);
    if(pass){
      wx.showLoading();
      self.passwordUpdate();
      
    }else{
      api.showToast('请补全信息','fail');
    };   
  },
  

}) 

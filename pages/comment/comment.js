//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sForm:{
      phone:'',
      content:'',   
    },
  },


  onLoad: function (options) {
  
  },



  addMessage(){
  	const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.sForm);
    const callback = (res)=>{
      wx.hideLoading();
      api.showToast('留言成功','fail');
    };
    api.messageAdd(postData,callback);
  },

  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
  },

   submit(){
    const self = this;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
        wx.showLoading();
        self.addMessage(); 
    }else{
      api.showToast('请补全信息','fail');
    };
  },

})

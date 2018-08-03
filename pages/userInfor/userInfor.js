//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({
  data: {


    submitData:{
    	name:'',
    	phone:'',
    	gender:''
    },
    sexItem:[
      {
          name:'男',
          value:'1'
      },
      {
          name:'女',
          value:'0'
      }
    ],


  },



  onLoad(){
    const self = this;
    self.userInfoGet();
    self.setData({
      web_submitData:self.data.submitData
    })
  },


  userInfoGet(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      console.log(res)
      self.data.submitData.phone = res.info.data[0].phone;
      self.data.submitData.gender = res.info.data[0].gender;
      self.data.submitData.name = res.info.data[0].name;
      self.setData({
        web_submitData:self.data.submitData,
      });
      wx.hideLoading();
    };
    api.userInfoGet(postData,callback);
  },


  changeBind(e){
    const self = this;
    if(api.getDataSet(e,'value')){
      self.data.submitData[api.getDataSet(e,'key')] = api.getDataSet(e,'value');
    }else{
      api.fillChange(e,self,'submitData');
    };
    console.log(self.data.submitData);
    self.setData({
      web_submitData:self.data.submitData,
    }); 
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },


  userInfoUpdate(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.submitData);
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userInfoUpdate(postData,callback);
  },
  

  userInfoAdd(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.submitData);
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userInfoAdd(postData,callback);
  },
  

  submit(){
    const self = this;
    const pass = api.checkComplete(self.data.submitData);
    if(pass){
      if(wx.getStorageSync('info').info){
        wx.showLoading();
        self.userInfoUpdate();
      }else{
        wx.showLoading();
        self.userInfoAdd();
      }  
    }else{
      api.showToast('请补全信息','fail');
    };
  },





})
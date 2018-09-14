//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {

    submitData:{
      score:'',

    }



  },



  onLoad(){
    const self = this;
    self.getComputeData();
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


  flowLogAdd(){
    const self = this;
    const postData = {
        token:wx.getStorageSync('token'),
        data:{
          user_no:wx.getStorageSync('info').user_no,
          count:-self.data.submitData.score,
          trade_info:self.data.submitData.trade_info,
          status:0,
          type:3
        }
    };
    const callback = (res)=>{
      api.showToast('申请成功','fail'); 
      wx.navigateBack({
        delta: 1
      }) 
    };
    api.flowLogAdd(postData,callback)
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
          status:1
        }
      }
    };
    const callback = (res)=>{
      console.log(res);
      self.data.computeData = res.FlowLog.countsum;
    };
    api.flowLogCompute(postData,callback);
  },
  

  submit(){
    const self = this;
    var num = self.data.submitData.score;
    const pass = api.checkComplete(self.data.submitData);
    if(pass){  
      if(self.data.computeData&&self.data.computeData>=num){
        if(!(/(^[1-9]\d*$)/.test(num))){
         api.showToast('请输入正整数','fail')
        }else{
          self.flowLogAdd();
        }   
      }else{
        api.showToast('果冻不足','fail');  
      }   
    }else{
      api.showToast('请补全信息','fail');
    };
  },





})
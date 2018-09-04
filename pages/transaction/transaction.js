import {Api} from '../../utils/api.js';
const api = new Api();


Page({
  data: {
    sForm:{
      score:'',
    },
    userInfo:{},
    userInfoById:{},
    computeData:[],
    todayData:[]
  },
  
  onLoad(options){
    const self = this;
    var str = options.data;
    var data = str.split(',');
    self.data.userInfoById = data;
    console.log(wx.getStorageSync('login').userType)
    console.log(self.data.userInfoById[2])
    self.setData({
      web_userInfoById:self.data.userInfoById
    })
    if(!self.data.userInfoById){
      const func = ()=>{
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index'
            });
          },1000);
        };
        api.showToast('二维码失效','fail',func);
      }else if(self.data.userInfoById[2] == wx.getStorageSync('login').userType){
        
        const toastCallback = (res)=>{
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index'
            });
          },1000);
        }
        api.showToast('无效用户','fail',toastCallback);
      }
  },

  onShow(){
    const self = this;
    self.getTodayComputeData();
    self.getComputeData();
  },



  fillChange(e){
    const self = this;
    api.fillChange(e,self,'sForm');
  },



  getTodayComputeData(){
    const self = this;
    const postData = {};
    postData.data = {
      FlowLog:{
        compute:{
          count:'sum',
        },
        
        searchItem:{
          create_time:['between',[new Date(new Date().setHours(0, 0, 0, 0)) / 1000,new Date(new Date().setHours(0, 0, 0, 0)) / 1000 + 24 * 60 * 60-1]],
          user_no:wx.getStorageSync('info').user_no,
          type:3,
          count:['<','0']
        }
      }
    };
    const callback = (res)=>{
      console.log(res);
      self.data.todayData = res.FlowLog.countsum;
    };
    api.flowLogCompute(postData,callback);
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
    };
    api.flowLogCompute(postData,callback);
  },



  pay(){
    const self = this;
    if(wx.getStorageSync('login').userType == 0){
      self.data.sForm.score = -self.data.sForm.score
    }
    const postData = {
        token:wx.getStorageSync('token'),
        data:{
          user_no:wx.getStorageSync('info').user_no,
          type:3,
          count:self.data.sForm.score,
          trade_info:'积分消费',
          opposite_user_no:self.data.userInfoById[0]
        }
    };
    const callback = (res)=>{
      api.showToast('支付成功','fail');
      setTimeout(function(){
        api.pathTo('/pages/index/index','tab')
      },1000);
    };
    api.flowLogAdd(postData,callback)
  },
      
     
  



  submit(){
    const self = this;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      if(self.data.computeData&&self.data.computeData>=self.data.sForm.score){ 
        if(parseInt(-self.data.todayData)+parseInt(self.data.sForm.score) < parseInt(wx.getStorageSync('info').passage1)){
          self.pay();
        }else{
          api.showToast('超过日消费限额','fail')
        }   
      }else{
        api.showToast('剩余积分不足','fail')
      }
    }else{
      api.showToast('请输入积分','fail')
    }
  }


  
  
})

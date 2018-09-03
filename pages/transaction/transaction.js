import {Api} from '../../utils/api.js';
const api = new Api();


Page({
  data: {
    sForm:{
      score:'',
    },
    userInfo:{},
    userInfoById:{},

  },
  
  onLoad(options){
    const self = this;
    self.getComputeData();
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





  fillChange(e){
    const self = this;
    api.fillChange(e,self,'sForm');
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
          create_time:['between',[new Date(new Date().setHours(0, 0, 0, 0)) / 1000,new Date(new Date().setHours(0, 0, 0, 0)) / 1000 + 24 * 60 * 60-1]],
          user_no:wx.getStorageSync('info').user_no,
          type:3,
          count:['<','0']
        }
      }
    };
    const callback = (res)=>{
      console.log(res);
      self.data.computeData = res;
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
      api.dealRes(res);
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
      if(wx.getStorageSync('info').info.score&&wx.getStorageSync('info').info.score>=self.data.sForm.score){
        if(-self.data.computeData<wx.getStorageSync('info').passage1){
          self.pay();
        }else{
          api.showToast('超过日消费限额','fail')
        }   
      }else{
        api.showToast('剩余积分不足','fail')
      }
    }else{
      api.showToast('请补全信息','fail')
    }
  }


  
  
})

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
    todayData:[],
    limitData:'',
    buttonClicked: false,
    isShow:false,
    mainData:[],
  },
  
  onLoad(options){
    const self = this;
    var str = options.data;
    console.log(options.data)
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
    self.setData({
      web_score:self.data.sForm.score
    })
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
      console.log('test',parseFloat(wx.getStorageSync('info').passage1))
      self.data.todayData = res.FlowLog.countsum;
      self.data.sslimitData = (parseFloat(wx.getStorageSync('info').passage1)-parseFloat(-self.data.todayData)).toFixed(2);
      console.log(self.data.sslimitData)
      self.setData({
        web_sslimitData:self.data.sslimitData
      })
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

  getMainData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.searchItem = {
      type:3  
    };
    postData.order = {
      create_time:'desc',
    };
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      self.setData({
        web_mainData:self.data.mainData,
      });
      wx.hideLoading();
    };
    api.flowLogGet(postData,callback);
  },

  show(){
    const self = this;
    if(self.data.isShow == false){
      self.setData({
        isShow:true
      })
    }else{
      self.setData({
        isShow:false
      })
    }
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
          opposite_user_no:self.data.userInfoById[0],
          behavior:0
        }
    };
    const callback = (res)=>{
      if(res&&res.solely_code==100000){
          setTimeout(function(){
            self.setData({
              buttonClicked: false
            });
            self.buttonClicked = false;
          }, 1000)
          self.getMainData();
          setTimeout(function(){
            self.show()
          },1000);         
        }; 
    
    };
    api.flowLogAdd(postData,callback)
  },
      
     
  



  submit(){
    const self = this;
    if(self.buttonClicked){
      return;
    };
    self.buttonClicked = true;
    self.setData({
      buttonClicked: true
    });
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      if(self.data.computeData&&self.data.computeData>=self.data.sForm.score){ 
        if(parseInt(-self.data.todayData)+parseInt(self.data.sForm.score) <= parseInt(wx.getStorageSync('info').passage1)){
          self.pay();
        }else{
          api.showToast('超过日消费限额','fail')
          setTimeout(function(){
            self.setData({
              buttonClicked: false
            });
            self.buttonClicked = false;
          }, 1000)  
        }   
      }else{
        api.showToast('剩余积分不足','fail')
        setTimeout(function(){
            self.setData({
              buttonClicked: false
            });
            self.buttonClicked = false;
          }, 1000)  
      }
    }else{
      api.showToast('请输入积分','fail')
      setTimeout(function(){
            self.setData({
              buttonClicked: false
            });
            self.buttonClicked = false;
          }, 1000)  
    }
  }


  
  
})

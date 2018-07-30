//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  
  },
  //事件处理函数
 
  onLoad: function () {
   
  },
 login:function(){
 	wx.navigateTo({
 		url:'/pages/login/login'
 	})
 },
 detail:function(){
 	wx.navigateTo({
 		url:'/pages/detail/detail'
 	})
 },
})

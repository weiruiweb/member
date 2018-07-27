//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
   
  },
  onLoad: function () {
    
  },
  userInfor:function(){
  	wx.navigateTo({
  		url:'/pages/userInfor/userInfor'
  	})
  },
  credit:function(){
  	wx.navigateTo({
  		url:'/pages/credit/credit'
  	})
  },
  about:function(){
  	wx.navigateTo({
  		url:'/pages/about/about'
  	})
  },
  message:function(){
  	wx.navigateTo({
  		url:'/pages/message/message'
  	})
  },
  comment:function(){
  	wx.navigateTo({
  		url:'/pages/comment/comment'
  	})
  }
})

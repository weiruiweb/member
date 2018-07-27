//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
   
  },
  onLoad: function () {
    
  },
  income:function(){
  	wx.navigateTo({
  		url:'/pages/incomRecord/incomRecord'
  	})
  },
  cash:function(){
  	wx.navigateTo({
  		url:'/pages/cash/cash'
  	})
  },
  credit:function(){
  	wx.navigateTo({
  		url:'/pages/credit/credit'
  	})
  },
})

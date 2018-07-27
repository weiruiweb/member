//logs.js
const util = require('../../utils/util.js')

Page({
  data: {

  },
  onLoad: function () {
    
  },
  password:function(){
  	wx.navigateTo({
  		url:'/pages/password/password'
  	})
  },
  incomRecord:function(){
  	wx.navigateTo({
  		url:'/pages/incomRecord/incomRecord'
  	})
  },
  cash:function(){
  	wx.navigateTo({
  		url:'/pages/cash/cash'
  	})
  },
  qcorde:function(){
  	wx.navigateTo({
  		url:'/pages/qcorde/qcorde'
  	})
  },
  Mmessage:function(){
  	wx.navigateTo({
  		url:'/pages/Mmessage/Mmessage'
  	})
  },

})

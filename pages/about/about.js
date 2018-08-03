//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    mainData:[]

  },
    

  onLoad(options){
    const self = this;
    self.getMainData();
  },

  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);  
    };
    const postData = {};
    postData.searchItem = {
      thirdapp_id:'59',
      menu_id:'380'
    };
    postData.order = {
      create_time:'desc'
    };
    const callback = (res)=>{
      self.data.mainData = res.info.data[0];
      wx.hideLoading();
      self.data.mainData.content = api.wxParseReturn(res.info.data[0].content).nodes;
      self.setData({
        web_mainData:self.data.mainData,
      });  
    };
    api.articleGet(postData,callback);
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

})
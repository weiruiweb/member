//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    mainData:[],
    searchItem:{
      thirdapp_id:getApp().globalData.thirdapp_id,
    },
    searchItemOr:{},
    sForm:{
      item:''
    }
  },
    

  onLoad(options){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
  },

  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    console.log(self.data.sForm);
    if(self.data.sForm.item){
      self.data.searchItem.small_title = ['LIKE',['%'+self.data.sForm.item+'%']],
      self.data.searchItemOr.passage1 = ['LIKE',['%'+self.data.sForm.item+'%']],
      self.getMainData(true)
    }else if(self.data.sForm.item==''){
      delete self.data.searchItem.small_title,
      delete self.data.searchItemOr.passage1,
      self.getMainData(true)
    }
  },

  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);  
    };
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = api.cloneForm(self.data.searchItem);
    postData.searchItemOr = api.cloneForm(self.data.searchItemOr);
    postData.order = {
      create_time:'desc'
    };
    postData.getBefore = {
      article:{
        tableName:'label',
        searchItem:{
          title:['=',['商家列表']],
          thirdapp_id:['=',[getApp().globalData.thirdapp_id]],
        },
        middleKey:'menu_id',
        key:'id',
        condition:'in',
      },
    };
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      wx.hideLoading();
      self.setData({
        web_mainData:self.data.mainData,
      });  
    };
    api.articleGet(postData,callback);
  },

  articleGet(Name){
    const self = this;
    const postData = {
      searchItem:{
        title:['LIKE',['%'+Name+'%']],
        thirdapp_id:getApp().globalData.thirdapp_id,
      }
    };
    const callback = (res)=>{

    };
    api.articleGet(postData,callback);
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

})

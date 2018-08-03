import { Base } from 'base.js';



class Api extends Base{


    


    realPay(param,callback){
        wx.requestPayment({
            'timeStamp': param.timeStamp,
            'nonceStr': param.nonceStr,
            'package': param.package,
            'signType': param.signType,
            'paySign': param.paySign,
            success: function () {
                wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 1000,
                    mask:true
                  });
                  
                callback && callback(1);
            },
            fail: function () {
                wx.showToast({
                    title: '支付失败',
                    icon: 'success',
                    duration: 1000,
                    mask:true
                });
                callback && callback(0);
            }
        });

    }
  


    labelGet(param,callback){
        var allParams ={
            url:'Common/Label/get',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }


    changeCourseStatus(param,callback){
        var allParams ={
            url:'Project/Yts/changeCourseStatus',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    


    labelDelete(param,callback){
        var allParams ={
            url:'Common/Label/Delete',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    


    labelUpdate(param,callback){
        var allParams ={
            url:'Common/Label/update',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    


    labelAdd(param,callback){
        var allParams ={
            url:'Common/Label/add',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }


    userInfoGet(param,callback){
        var allParams ={
            url:'Common/UserInfo/get',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    


    userInfoDelete(param,callback){
        var allParams ={
            url:'Common/UserInfo/delete',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    


    userInfoUpdate(param,callback){
        var allParams ={
            url:'Common/UserInfo/update',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    


    userInfoAdd(param,callback){
        var allParams ={
            url:'Common/UserInfo/add',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }



    userGet(param,callback){
        var allParams ={
            url:'Base/User/get',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    


    userDelete(param,callback){
        var allParams ={
            url:'Base/User/delete',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    


    userUpdate(param,callback){
        var allParams ={
            url:'Base/User/update',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    


    userAdd(param,callback){
        var allParams ={
            url:'Base/User/add',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }


    productGet(param,callback){
        var allParams ={
            url:'Common/Product/get',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    


    productDelete(param,callback){
        var allParams ={
            url:'Common/Product/delete',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    


    productUpdate(param,callback){
        var allParams ={
            url:'Common/Product/update',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }

    productAdd(param,callback){
        var allParams ={
            url:'Common/Product/add',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }


    skuAdd(param,callback){
        var allParams ={
            url:'Common/Sku/add',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }

    skuGet(param,callback){
        var allParams ={
            url:'Common/Sku/get',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    




    skuUpadate(param,callback){
        var allParams ={
            url:'Common/Sku/update',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    


    articleAdd(param,callback){
        var allParams ={
            url:'Common/Article/add',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }

    articleGet(param,callback){
        var allParams ={
            url:'Common/Article/get',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }    




    articleUpdate(param,callback){
        var allParams ={
            url:'Common/Article/update',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }  

    flowLogGet(param,callback){
        var allParams ={
            url:'Common/FlowLog/get',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }

    flowLogUpdate(param,callback){
        var allParams ={
            url:'Common/FlowLog/update',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }

    flowLogAdd(param,callback){
        var allParams ={
            url:'Common/FlowLog/add',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }

    flowLogCompute(param,callback){
        var allParams ={
            url:'Common/Common/compute',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }  



    messageGet(param,callback){
        var allParams ={
            url:'Common/Message/get',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }

    messageUpdate(param,callback){
        var allParams ={
            url:'Common/Message/update',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }

    messageAdd(param,callback){
        var allParams ={
            url:'Common/Message/add',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }

    messageDelete(param,callback){
        var allParams ={
            url:'Common/Message/delete',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }

    getQrCode(param,callback){
        var allParams ={
            url:'Base/Qr/CommonQrGet',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }  


    tokenGet(param,callback) {
        var allParams = {
            url:'token/user',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.request(allParams);
    }



}

export {Api};
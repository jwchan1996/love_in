// pages/hot/hot.js
//获取应用实例
const app = getApp()
//自定义导航条高度
const navigationBarHeight = (app.statusBarHeight + 44) + 'px'

//定义获取的每一组数据的最后一个post_id
let post_id = 0;
//定义请求的页数
let page = 2;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //导航条标题
    navigationBarTitle: '图虫',
    navigationBarHeight: navigationBarHeight,
    //是否有更多数据标志位
    more: true,
    //获取的数据
    feedList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.request({
      url: 'https://api.tuchong.com/feed-app', //图虫的推荐 接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //赋值给post_id变量
        post_id = res.data.feedList[res.data.feedList.length - 1].post_id;
        that.setData({
          counts: res.data.counts,
          more: res.data.more,
          feedList: res.data.feedList
        })
        console.log(that.data.feedList)
        //停止下拉刷新动画
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    //重置页数标志位
    page = 2;
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {  
    let that = this;
    console.log("post_id:" + post_id)
    console.log("page:" + page)
    wx.request({
      url: 'https://api.tuchong.com/feed-app', //图虫的推荐 接口地址
      data: {
        post_id: post_id,
        page: page,
        type: 'loadmore'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let arr = that.data.feedList;
        arr = arr.concat(res.data.feedList);
        console.log(arr)
        that.setData({
          counts: res.data.counts,
          more: res.data.more,
          feedList: arr
        })
        //赋值给post_id变量
        post_id = res.data.feedList[res.data.feedList.length - 1].post_id;
        //页数page标志增加
        page++;
        //停止下拉刷新动画
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 点击图片
   * 查看图片细节
   */
  viewImageDetails: function(event) {
    console.log(event.currentTarget.dataset.src)
    console.log(event.currentTarget.dataset.images)
    //对传递过来的images对象进行提取
    let images = event.currentTarget.dataset.images;
    let imagesUrls = [];
    for (let i = 0; i < images.length; i++) {
      imagesUrls.push("https://photo.tuchong.com/" + images[i].user_id + "/f/" + images[i].img_id + ".jpg");
    }
    wx.previewImage({
      current: event.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: imagesUrls // 需要预览的图片http链接列表
    })
  },

  /**
   * 点击作者头像
   * 查看作者详情
   */
  viewSiteDetails: function(event) {
    let siteId = event.currentTarget.dataset.siteId;
    let siteIcon = event.currentTarget.dataset.siteIcon;
    let siteName = event.currentTarget.dataset.siteName;
    let siteDescription = event.currentTarget.dataset.siteDescription;
    let siteFollowers = event.currentTarget.dataset.siteFollowers;
    console.log(siteFollowers)
    //打开新页面
    wx.navigateTo({
      url: 'site/site?site_id=' + siteId + '&site_followers=' + siteFollowers + '&site_description=' + siteDescription + '&site_name=' + siteName + '&site_icon=' + siteIcon,
    })
  }
})
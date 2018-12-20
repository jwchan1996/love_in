// pages/index/site/site.js
//获取应用实例
const app = getApp()
//自定义导航条高度
const navigationBarHeight = (app.statusBarHeight + 44) + 'px'
//数据页数
let page=2;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //导航条标题
    navigationBarTitle: '',
    navigationBarHeight: navigationBarHeight,
    //作品总数
    counts: 0,
    //是否有更多数据标志位
    more: true,
    postList: [],
    //设置作者关注的人的数量
    followNum: Math.floor(100*Math.random())
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取页面传递过来的信息
    this.setData({
      siteId: options.site_id,
      siteIcon: options.site_icon.replace("small", "medium"),
      siteName: options.site_name,
      siteFollowers: options.site_followers,
      siteDescription: options.site_description
    });
    let that = this;
    wx.request({
      url: 'https://fengcao.tuchong.com/rest/2/sites/'+options.site_id+'/posts?count=20&page=1&before_timestamp=0', //获取作者所有图文作品数据
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          counts: res.data.counts,
          postList: res.data.post_list
        })
        //停止下拉刷新动画
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //重置页数标志位
    page=2;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    wx.request({
      url: 'https://fengcao.tuchong.com/rest/2/sites/' + that.data.siteId + '/posts?count=20&page=1&before_timestamp=0', //获取作者所有图文作品数据
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          counts: res.data.counts,
          more: res.data.more,
          postList: res.data.post_list
        })
        //停止下拉刷新动画
        wx.stopPullDownRefresh()
        //重置页数标志位
        page = 2;
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(page)
    let that = this;
    wx.request({
      url: 'https://fengcao.tuchong.com/rest/2/sites/' + that.data.siteId + '/posts?count=20&page='+page+'&before_timestamp=0', //获取作者所有图文作品数据
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let arr = that.data.postList;
        arr = arr.concat(res.data.post_list);
        console.log(arr)
        that.setData({
          counts: res.data.counts,
          more: res.data.more,
          postList: arr
        })
        page++;
        //停止下拉刷新动画
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击图片
   * 查看作品集详情
   */
  viewImagesDetails: function(event){
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
  }
})
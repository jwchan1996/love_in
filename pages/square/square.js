// pages/square/square.js
//获取应用实例
const app = getApp()
//自定义导航条高度
const navigationBarHeight = (app.statusBarHeight + 44) + 'px'

Page({

  inputValue: '',
  /**
   * 页面的初始数据
   */
  data: {
    //导航条标题
    // navigationBarTitle: '情之林',
    navigationBarTitle: '热门新番',
    navigationBarHeight: navigationBarHeight,
    imgUrls: [
      'http://wx4.sinaimg.cn/mw690/0060lm7Tly1fz3nlb1njaj30u016gn54.jpg',
      'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=cbb11d8401d79123f4ed9c26cc5d32e7/b8389b504fc2d56284049d61ea1190ef76c66c29.jpg',
      'http://wx2.sinaimg.cn/mw690/0060lm7Tly1fz4upw54j4j30ch0hsdh7.jpg'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 3000,
    duration: 800,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
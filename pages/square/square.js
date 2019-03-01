// pages/square/square.js
//获取应用实例
const app = getApp()
//自定义导航条高度
const navigationBarHeight = (app.statusBarHeight + 44) + 'px'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //导航条标题
    navigationBarTitle: '热门新番',
    navigationBarHeight: navigationBarHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(res) {
    this.getRecommendList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 获取番剧推荐
   */
  getRecommendList() {
    wx.request({
      url: 'https://api.clicli.top/posts/both?status=public&type=tuijian&page=1&pageSize=20',
      success(res) {
        console.log(res.data)
      }
    })
  }
})
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
    weekList: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
    currentDay: []
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
    this.getWeekList()
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
  getWeekList() {
    let _this = this
    wx.request({
      url: 'https://www.clicli.top/week/',
      success(res) {
        console.log(res.data)
        _this.weekList = res.data.data
        _this.Monday = res.data.data[0].content
        _this.Tuesday = res.data.data[1].content
        _this.Wednesday = res.data.data[2].content
        _this.Thursday = res.data.data[3].content
        _this.Friday = res.data.data[4].content
        _this.Saturday = res.data.data[5].content
        _this.Sunday = res.data.data[6].content

        //获取今天的番剧数据
        _this.getCurrentDay()
      }
    })
  },

  /**
   * 获取今天周几
   */
  getCurrentDay(){
    let date = new Date();
    let ddy = date.getDay();//获取存储当前日期
    
    switch(ddy){
      case 1:
        this.setData({
          currentDay: this.Monday
        })
        break
      case 2:
        this.setData({
          currentDay: this.Tuesday
        })
        break
      case 3:
        this.setData({
          currentDay: this.Wednesday
        })
        break
      case 4:
        this.setData({
          currentDay: this.Thursday
        })
        break
      case 5:
        this.setData({
          currentDay: this.Friday
        })
        break
      case 6:
        this.setData({
          currentDay: this.Saturday
        })
        break
      case 7:
        this.setData({
          currentDay: this.Sunday
        })
        break
      default:
    }
    
  }
})
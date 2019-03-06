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
    currentDay: [],
    recommend: [],
    //选定日更tap标志
    currentTap: 0
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
    this.getRecommend()
    this.getCurrentDay()
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
        _this.data.weekList = res.data.data
        _this.data.Monday = res.data.data[0].content
        _this.data.Tuesday = res.data.data[1].content
        _this.data.Wednesday = res.data.data[2].content
        _this.data.Thursday = res.data.data[3].content
        _this.data.Friday = res.data.data[4].content
        _this.data.Saturday = res.data.data[5].content
        _this.data.Sunday = res.data.data[6].content

        //获取今天的番剧数据
        // _this.getCurrentDay()
      }
    })
  },

  /**
   * 获取今天是周几
   */
  getCurrentDay() {
    let now = new Date()
    let day = now.getDay()
    console.log(day)
  },

  /**
   * 获取点击的日更番剧
   */
  getDayList(e) {

    let ddy = e.currentTarget.dataset.ddy

    switch (ddy) {
      case '0':   
        this.setData({
          currentTap: 0, 
          currentDay: this.data.recommend
        })  
        break
      case '1':
        this.setData({
          currentTap: 1, 
          currentDay: this.data.Monday
        })
        break
      case '2':
        this.setData({
          currentTap: 2, 
          currentDay: this.data.Tuesday
        })
        break
      case '3':
        this.setData({
          currentTap: 3, 
          currentDay: this.data.Wednesday
        })
        break
      case '4':
        this.setData({
          currentTap: 4, 
          currentDay: this.data.Thursday
        })
        break
      case '5':
        this.setData({
          currentTap: 5, 
          currentDay: this.data.Friday
        })
        break
      case '6':
        this.setData({
          currentTap: 6, 
          currentDay: this.data.Saturday
        })
        break
      case '7':
        this.setData({
          currentTap: 7, 
          currentDay: this.data.Sunday
        })
        break
      default:
    }

  },

  /**
   * 获取番剧推荐
   */
  getRecommend() {
    let _this = this
    wx.request({
      url: 'https://api.clicli.top/posts/both?status=public&type=tuijian&page=1&pageSize=10',
      success(res) {

        console.log(res.data)

        if (res.data.code == 201) {
          let posts = res.data.posts
          let arr = []

          for (let i = 0; i < posts.length; i++) {
            arr[i] = {
              "title": posts[i].title,
              "suo": _this.getImgUrl(posts[i].content),
              "av": String(posts[i].id)
            }
          }

          _this.setData({
            recommend: arr
          })
         
          _this.setData({
            currentDay: arr
          })

          console.log(_this.data.currentDay)

        } else {

        }

      }
    })
  },

  /**
   * 获取番剧封面
   */
  getImgUrl(content) {
    if (content.indexOf('[suo]') !== -1) {
      return content.split('[suo](')[1].split(')')[0]
    } else {
      if (content.indexOf('![](') !== -1) {
        return content.split('](')[1].split(')')[0]
      } else {
        return "https://b-ssl.duitang.com/uploads/item/201501/07/20150107202826_UXcuQ.gif"
      }
    }
  },
})
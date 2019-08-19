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
    //每个tap对应的数据
    recommend: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
    //当前选中的番剧数据
    currentPostData: [],
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
    //获取日更表
    this.getWeekList()
    //获取推荐
    this.getRecommend()
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
   * 获取番剧更新表
   */
  getWeekList() {
    wx.request({
      url: 'https://api.clicli.us/posts?status=nowait&sort=新番&page=1&pageSize=100',
      success: res => {

        if (res.data.code == 200) {

          let posts = res.data.posts
          let arr = []

          for (let i = 0; i < posts.length; i++) {
            arr[i] = {
              "title": posts[i].title,
              "suo": this.getImgUrl(posts[i].content),
              "av": String(posts[i].id),
              "time": posts[i].time
            }
          }

          let ret = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
          }
          arr.forEach(item => {
            let day = new Date(item.time).getDay() + 1
            ret[day].push(item)
          })

          this.data.weekList = ret
          this.data.Monday = ret[1]
          this.data.Tuesday = ret[2]
          this.data.Wednesday = ret[3]
          this.data.Thursday = ret[4]
          this.data.Friday = ret[5]
          this.data.Saturday = ret[6]
          this.data.Sunday = ret[7]

        }else{

  

        }

      }
    })
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
          currentPostData: this.data.recommend
        })  
        break
      case '1':
        this.setData({
          currentTap: 1, 
          currentPostData: this.data.Monday
        })
        break
      case '2':
        this.setData({
          currentTap: 2, 
          currentPostData: this.data.Tuesday
        })
        break
      case '3':
        this.setData({
          currentTap: 3, 
          currentPostData: this.data.Wednesday
        })
        break
      case '4':
        this.setData({
          currentTap: 4, 
          currentPostData: this.data.Thursday
        })
        break
      case '5':
        this.setData({
          currentTap: 5, 
          currentPostData: this.data.Friday
        })
        break
      case '6':
        this.setData({
          currentTap: 6, 
          currentPostData: this.data.Saturday
        })
        break
      case '7':
        this.setData({
          currentTap: 7, 
          currentPostData: this.data.Sunday
        })
        break
      default:
    }

  },

  /**
   * 获取番剧推荐
   */
  getRecommend() {
    
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: 'https://api.clicli.us/posts?status=public&sort=&tag=推荐&uid=&page=1&pageSize=8',
      success: res => {

        wx.hideLoading()

        if (res.data.code == 200) {
          let posts = res.data.posts
          let arr = []

          for (let i = 0; i < posts.length; i++) {
            arr[i] = {
              "title": posts[i].title,
              "suo": this.getImgUrl(posts[i].content),
              "av": String(posts[i].id),
              "time": posts[i].time
            }
          }

          this.setData({
            recommend: arr
          })

          this.setData({
            currentTap: 0,
            currentPostData: arr
          })  

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

  /**
   * 跳转播放页面
   */
  playVideo(e) {
    let av = e.currentTarget.dataset.av
    wx.navigateTo({
      url: `./play/play?av=${av}`,
    })
  }

})
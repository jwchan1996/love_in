//获取应用实例
const app = getApp()
//自定义导航条高度
const navigationBarHeight = (app.statusBarHeight + 44) + 'px'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight: navigationBarHeight,
    navigationBarTitle: '搜索结果',
    postList: [],
    keywords: '',
    //请求加载完毕标志
    httpCompleted: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keywords: options.keywords
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.search()
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

  /**
   * 搜索番剧
   */
  search(){

    wx.showLoading({
      title: '加载中…'
    })

    let keywords = this.data.keywords
    wx.request({
      url: `https://api.clicli.us/search/posts?key=${keywords}&page=1&pageSize=20`,
      success: res => {

        this.setData({
          httpCompleted: 1
        })

        if(res.data.code == "200"){

          wx.hideLoading()

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
            postList: arr
          })

        }else{
          wx.hideLoading()
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
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `../play/play?av=${av}&title=${title}`,
    })
  },
})
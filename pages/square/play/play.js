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
    navigationBarHeight: navigationBarHeight,
    navigationBarTitle: '',
    av: null,
    src: '',
    videoTitle: '',
    videoList: [],
    checkedId: null,
    danmuList: [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      av: options.av,
      navigationBarTitle: options.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.videoContext = wx.createVideoContext('myVideo')
    this.getVideoList()
    //增加浏览量
    this.getPostPv()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 获取视频列表
   */
  getVideoList() {

    wx.showLoading({
      title: '加载中…',
    })

    wx.request({
      url: `https://api.clicli.us/videos?pid=${this.data.av}&page=1&pageSize=150`,
      success: res => {

        console.log(res.data.videos)

        this.setData({
          videoList: res.data.videos
        })

        wx.hideLoading()

        // let content = ''
        // res.data.videos.forEach(item => {
        //   if (item.oid == 1) {
        //     content = item.content
        //   }
        // })

        // this.getRealUrl(content)
      }
    })
  },

  /**
   * 获取视频解析
   */
  getRealUrl(url) {

    wx.showLoading({
      title: '加载中…',
    })

    console.log(url)
    wx.request({
      url: `https://jx.clicli.us/jx?url=${url}`,
      success: res => {
        console.log(res.data)
        this.setData({
          src: res.data.url
        })

        wx.hideLoading()

        this.videoContext.play()

        console.log(this.data.src)
      }
    })

  },

  /**
   * 增加浏览量
   */
  getPostPv(){
    let av = this.data.av
    wx.request({
      url: `https://jx.clicli.us/get/pv?pid=${av}`,
      success: res => {
        console.log(res.data)
      }
    })
  },

  /**
   * 播放当前视频
   */
  play(e) {
    //获取视频直链
    this.getRealUrl(e.currentTarget.dataset.content)
    //暂停视频
    this.videoContext.pause()
    //添加选中样式，设置video全屏title
    this.setData({
      checkedId: e.currentTarget.dataset.id,
      videoTitle: e.currentTarget.dataset.title
    })
  },

  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },

  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  }

})

function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
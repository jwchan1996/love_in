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
    videoList: [],
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

    let WxParse = require('../../../wxParse/wxParse.js')

    let article = '![suo](http://wx4.sinaimg.cn/mw690/0060lm7Tly1fz3nlb1njaj30u016gn54.jpg)↵幼年丧母的高中男生・藤井夏生，默默暗恋着高中老师・橘阳菜。↵无法实现的思念涌入心中，突然被邀请参加联谊的夏生，与在那里遇到的橘瑠衣一起进行了首次体验。↵这时，父亲打算再婚。作为父亲再婚对象出现在夏生面前的，是阳菜和瑠衣……↵在同一屋檐下生活的3个人，形成了禁断的三角关系。';
    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    let that = this;
    WxParse.wxParse('article', 'md', article, that, 5);
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

        console.log(this.data.src)
      }
    })

  },

  /**
   * 播放当前视频
   */
  play(e) {
    let url = e.currentTarget.dataset.content
    console.log(url)
    this.getRealUrl(url)
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
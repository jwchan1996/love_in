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
    navigationBarTitle: '',
    av: null,
    src: '',
    videoTitle: '',
    videoList: [],
    checkedVid: null,
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
    ],
    currentTime: 0,
    inputValue: '',
    //是否隐藏登录弹出框
    hiddenmodalput: true,
    //用户名
    account: '',
    //密码
    password: '',
    //用户id
    uid: 0
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
    //获取播放器对象
    this.videoContext = wx.createVideoContext('myVideo')
    //获取视频列表
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

    //暂停视频
    this.videoContext.pause()

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

        setTimeout(() => {
          wx.hideLoading()

          this.videoContext.play()

          console.log(this.data.src)
        }, 1000)
        
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
    //设置选中的视频di，添加选中样式，设置video全屏title
    this.setData({
      checkedVid: e.currentTarget.dataset.id,
      videoTitle: e.currentTarget.dataset.title
    })
    //获取当前视频的弹幕列表
    this.getDanMuKu(e.currentTarget.dataset.id)
  },

  /**
   * 获取当前视频的弹幕列表
   */
  getDanMuKu(vid){
    wx.request({
      url: `https://api.clicli.us/comments?vid=${vid}&page=1&pageSize=200`,
      success: res => {

        console.log(res.data)
        let danmuList = this.forDanmu(res.data.comments)
        this.setData({
          danmuList
        })
      
      },
    })
  },

  /**
   * 解析组装弹幕
   */
  forDanmu(arr) {
    let out = []
    for (let i in arr) {
      let res = {}
      res['text'] = arr[i]['content']
      res['time'] = arr[i]['time']
      res['color'] = arr[i]['color']
      out[i] = res
    }
    return out
  },

  /**
   * 监听输入框值得变化
   */
  bindInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  /**
   * 登录框取消
   */
  cancel(){
    this.setData({
      hiddenmodalput: true
    })
  },

  /**
   * 登录框确认
   */
  confirm(){
    if (this.data.account.trim() == '' || this.data.password.trim() == '') {
      wx.showModal({
        title: '提示',
        content: '用户名或密码不能为空',
        showCancel: false
      })
      return
    }
    wx.showLoading({
      title: '登录中……',
      icon: 'none'
    })
    wx.request({
      url: `https://api.clicli.us/user/login`,
      method: "POST",
      data: {
        name: this.data.account,
        pwd: this.data.password
      },
      header: {
        "content-type": 'application/json; charset=utf-8'
      },
      success: res => {
        console.log(res.data)
        if(res.data.code == 200){
          wx.showToast({
            title: '登录成功',
            icon: 'none'
          })
          wx.setStorageSync('uid', res.data.user.id)
          this.setData({
            uid: res.data.user.id,
            hiddenmodalput: true
          })
        }else{
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'none'
          })
        }
      },
      fail(err){
        wx.showToast({
          title: '服务器开小差了',
        })
      }
    })
    this.setData({
      hiddenmodalput: true
    })
  },

  /**
   * 绑定用户名输入框的值
   */
  bindAccount(e){
    console.log(e.detail.value)
    this.setData({
      account: e.detail.value
    })
  },

  /**
  * 绑定密码输入框的值
  */
  bindPassword(e) {
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 发送弹幕
   */
  bindSendDanmu() {
    let loginStatus = wx.getStorageSync('uid')
    console.log(loginStatus)
    if(!loginStatus){
      console.log("请先登录")
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
      return
    }
    if(this.data.inputValue.trim() == ''){
      wx.showModal({
        title: '提示',
        content: '弹幕内容不能为空……',
        showCancel: false
      })
      return
    }
    if (!this.data.checkedVid){
      wx.showModal({
        title: '提示',
        content: '请先选择集数……',
        showCancel: false
      })
      this.setData({
        inputValue: ''
      })
      return
    }
    //获取随机弹幕颜色
    let danMuColor = getRandomColor()
    console.log(danMuColor)
    console.log(this.data.inputValue)
    //播放器显示
    this.videoContext.sendDanmu({
      text: this.data.inputValue,
      color: danMuColor
    })
    //获取当前弹幕在视频的秒数
    console.log(this.data.currentTime)
    let time = Math.round(this.data.currentTime)
    console.log(time)
    wx.request({
      url: `https://api.clicli.us/comment/add`,
      method: "POST",
      data: {
        content: this.data.inputValue,
        pid: parseInt(this.data.av),
        uid: parseInt(this.data.uid),
        vid: parseInt(this.data.checkedVid) ? parseInt(this.data.checkedVid) : 1,
        color: danMuColor ? danMuColor : '#fff',
        tuid: 0,
        time: time ? time : 0
      },
      header: {
        "content-type": 'application/json; charset=utf-8',
        // "cookie": "__cfduid=ddacd84b3f0f34f0f18d348ee112439ac1559204920; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImV4cCI6MTU2Njk2Mjk4NiwiaWF0IjpudWxsLCJpc3MiOm51bGwsImp0aSI6bnVsbCwibGV2ZWwiOjQsIm5iZiI6bnVsbCwic3ViIjpudWxsfQ.BxF2GrnEJt5QS20Mmm5LjCEGdGWd5Jmx_ymZgd-XrmM; uqq=741755613; uid=200; level=4" 
      },
      success: res => {
        console.log(res.data)
      }
    })
    this.setData({
      inputValue: ''
    })
  },

  /**
   * 监听视频播放进度
   */
  bindTimeUpdate(e){
    this.setData({
      currentTime: e.detail.currentTime
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
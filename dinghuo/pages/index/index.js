import WxValidate from '../../utils/WxValidate.js';
//index.js        
//获取应用实例
const app = getApp()

Page({
  data: {
    // form: {
    //   username: '',
    //   password: ''
    // },

  },

  //报错 
  showModal(error) {
    wx.showToast({
      title: error.msg,
      icon: 'none',
      duration: 2000
    })
  },
  onLoad: function() {
    rules: {}
    message: {}
  },

  //验证函数
  initValidate() {
    const rules = {
      username: {
        required: true,
      },
      password: {
        required: true,
      }
    }
    const messages = {
      username: {
        required: '请输入账号',
      },
      password: {
        required: '请输入密码',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  onLoad: function(options) {
    this.initValidate()
  },

  //调用验证函数
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    //校验账户密码是否正确
    if (params.username != "a" && params.password != "a")
      this.showModal({
        msg: '帐户名或密码错误'
      })
    else {
      this.showModal({
        msg: '登录成功'
      })
      wx.switchTab({
        url: '../commodity/commodity',
      })
    }
  }

})
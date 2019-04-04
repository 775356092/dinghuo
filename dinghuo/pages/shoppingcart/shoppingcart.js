// pages/shoppingcart/shoppingcart.js
Page({
  data: {
    isAllSelect: false,
    isScroll: true,
    totalMoney: 0,
    delBtnWidth: 160,
    buy_num: 1,
    // 商品详情介绍
    carts: [{
        pic: "http://mz.djmall.xmisp.cn/files/product/20161201/148058328876.jpg",
        name: "日本资生堂洗颜",
        price: 200,
        isSelect: false,
        right: 0,
        // 数据设定
        count: {
          quantity: 2,
          min: 1,
          max: 20
        },
      },
      {
        pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058301941.jpg',
        name: "倩碧焕妍活力精华露",
        price: 340,
        isSelect: false,
        right: 0,
        // 数据设定
        count: {
          quantity: 20,
          min: 1,
          max: 20
        },
      },
      {
        pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/14805828016.jpg',
        name: "特效润肤露",
        price: 390,
        isSelect: false,
        right: 0,
        // 数据设定
        count: {
          quantity: 3,
          min: 1,
          max: 20
        },
      },
      {
        pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058228431.jpg',
        name: "倩碧水嫩保湿精华面霜",
        price: 490,
        isSelect: false,
        right: 0,
        // 数据设定
        count: {
          quantity: 1,
          min: 1,
          max: 20
        },
      },
      {
        pic: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057953326.jpg',
        name: "兰蔻清莹柔肤爽肤水",
        price: 289,
        isSelect: false,
        right: 0,
        // 数据设定
        count: {
          quantity: 10,
          min: 1,
          max: 20
        },
      },
      {
        pic: "http://mz.djmall.xmisp.cn/files/product/20161201/148057921620_middle.jpg",
        name: "LANCOME兰蔻小黑瓶精华",
        price: 230,
        isSelect: false,
        right: 0,
        // 数据设定
        count: {
          quantity: 1,
          min: 1,
          max: 20
        },
      },
    ],
  },

  //勾选事件处理函数  
  switchSelect: function(e) {
    // 获取item项的id，和数组的下标值  
    var Allprice = 0,
      i = 0;
    let id = e.target.dataset.id,

      index = parseInt(e.target.dataset.index);
    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;
    //价钱统计
    if (this.data.carts[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney + this.data.carts[index].price * this.data.carts[index].count.quantity;
    } else {
      this.data.totalMoney = this.data.totalMoney - this.data.carts[index].price * this.data.carts[index].count.quantity;
    }
    //是否全选判断
    for (i = 0; i < this.data.carts.length; i++) {
      Allprice = Allprice + this.data.carts[i].price * this.data.carts[index].count.quantity;
    }
    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    } else {
      this.data.isAllSelect = false;
    }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
    })
  },
  //全选
  allSelect: function(e) {
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelect) {
      for (i = 0; i < this.data.carts.length; i++) {
        if (!this.data.carts[i].isSelect) {
          this.data.carts[i].isSelect = true;
          this.data.totalMoney = this.data.totalMoney + this.data.carts[i].price * this.data.carts[i].count.quantity;
        }
      }
    } else {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      carts: this.data.carts,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
    })
  },
  //减少商品数量
  bindMinus: function(e) {
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    if (this.data.carts[index].count.quantity == 1) {
      wx.showToast({
        title: "商品数目不能再减少啦",
        icon: 'none'
      })
    } else {
      this.data.carts[index].count.quantity -= 1;
      if (this.data.carts[index].isSelect) {
        this.data.totalMoney = this.data.totalMoney - this.data.carts[index].price;
      }
    }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney
    })
    // console.log("index:" + index);
  },
  //增加商品数量
  bindPlus: function(e) {
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    index = parseInt(e.target.dataset.index);
    if (this.data.carts[index].count.quantity >= this.data.carts[index].count.max) {
      wx.showToast({
        title: "商品数目超过库存啦",
        icon: 'none'
      })
    } else {
      this.data.carts[index].count.quantity += 1;
      if (this.data.carts[index].isSelect) {
        this.data.totalMoney = this.data.totalMoney + this.data.carts[index].price;
      }
    }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney
    })
  },
  // 去结算
  toBuy() {
    wx.showToast({
      title: '去结算',
      icon: 'success',
      duration: 3000
    });
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  //数量变化处理
  handleQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;
    this.data.carts[componentId].count.quantity = quantity;
    this.setData({
      carts: this.data.carts,
    });
  },

  touchS: function(e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for (var index in this.data.carts) {
      var item = this.data.carts[index]
      item.right = 0
    }
    this.setData({
      carts: this.data.carts,
      startX: touch.clientX,
    })

  },
  touchM: function(e) {
    var touch = e.touches[0]
    var item = this.data.carts[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX

    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        carts: this.data.carts
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        carts: this.data.carts
      })
    }
  },
  touchE: function(e) {
    var item = this.data.carts[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth / 2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        carts: this.data.carts,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        carts: this.data.carts,
      })
    }
  },

  delcart: function(e) {
    let i = 0;
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;
    this.data.carts.splice(index, 1);

    // console.log(sum);
    // console.log(this.data.carts.length);

    this.data.totalMoney = 0;
    for (i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].isSelect) {
        this.data.totalMoney = this.data.totalMoney + this.data.carts[i].price * this.data.carts[i].count.quantity;
      }
    }

    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney
    })
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  }
})
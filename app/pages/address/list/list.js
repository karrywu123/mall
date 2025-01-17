// pages/address/list/list.js
import request from '../../../utils/request'

Page({
  data: {
    address: null
  },
  addAddress() {
    wx.navigateTo({ url: '/pages/address/add/add' })
  },
  editAddress: function(event) {
    console.log("AAA"+ event.currentTarget.id)
    wx.navigateTo({ url: '/pages/address/edit/edit?id=' + event.currentTarget.id })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    let res = await request.get('/address/list',{ 
      userId: wx.getStorageSync('uid')
    })
    this.setData({ address: res.data.data })
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

  }
})
// 全局app实例
// const app = getApp();
import regeneratorRuntime from'regenerator-runtime'

Page({
  data: {
    num: 1
  },
  onLoad() {
    // Do some initialize when page load.
    wx.showToast({
      title: 'titles', //提示的内容,
      icon: 'success', //图标,
      duration: 1000, //延迟时间,
      mask: false //显示透明蒙层，防止触摸穿透,
    });
    
  },
  onReady() {
    // Do something when page ready.
  },
  onShow() {
    // Do something when page show.  
    this.testAsync()
  },
  async testAsync () {
    let proMsg = await this.testPromise()
    console.log('support: async await - ' + proMsg)
  },
  testPromise() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res('promise')
      }, 1000)
    })
  },
  onHide() {
    // Do something when page hide.
  },
  onUnload() {
    // Do something when page close.
  },
  onPullDownRefresh() {
    // Do something when pull down.
  },
  onReachBottom() {
    // Do something when page reach bottom.
  },
  onShareAppMessage() {
    // return custom share data when user share.
  },
  onPageScroll() {
    // Do something when page scroll
  },
  onTabItemTap() {
    // 当前是 tab 页时，点击 tab 时触发
    // console.log(item.index);
    // console.log(item.pagePath);
    // console.log(item.text);
  },
  // Event handler.
  clickInPage() {
    this.setData({ num: this.data.num + 1 });
  },
  clickInTemplate() {
    this.setData({ num: this.data.num - 1 });
  },
  addNum() {
    this.setData({ num: this.data.num + 1 });
  },
  customData: {
    hi: 'MINA'
  }
});

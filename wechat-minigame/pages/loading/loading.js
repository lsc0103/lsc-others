Page({
  data: {
    progress: 0
  },
  onLoad() {
    this.timer = setInterval(() => {
      let p = this.data.progress + 5;
      if (p > 100) {
        clearInterval(this.timer);
        wx.redirectTo({ url: '/pages/index/index' });
      } else {
        this.setData({ progress: p });
      }
    }, 100);
  },
  onUnload() {
    clearInterval(this.timer);
  }
});

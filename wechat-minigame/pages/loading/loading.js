const app = getApp();

Page({
  data: {
    progress: 0,
    showAuth: false
  },
  onLoad() {
    if (!app.globalData.userInfo) {
      this.setData({ showAuth: true });
    }
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
  },
  onAuthed() {
    this.setData({ showAuth: false });
  }
});

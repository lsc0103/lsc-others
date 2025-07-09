App({
  onLaunch() {
    const info = wx.getStorageSync('userInfo');
    if (info) {
      this.globalData.userInfo = info;
    }
  },
  globalData: {
    rooms: {},
    userInfo: null
  }
});

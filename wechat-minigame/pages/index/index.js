const app = getApp();

Page({
  data: {
    showAuth: false
  },
  onLoad() {
    if (!app.globalData.userInfo) {
      this.setData({ showAuth: true });
    }
  },
  createRoom() {
    const roomId = Date.now().toString();
    wx.navigateTo({
      url: `/pages/room/room?roomId=${roomId}&host=1`
    });
  },
  onShareAppMessage() {
    return {
      title: '星际探索房间',
      path: '/pages/index/index'
    }
  },
  onAuthed() {
    this.setData({ showAuth: false });
  }
});

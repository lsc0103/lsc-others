const app = getApp();

Page({
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
  }
});

const app = getApp();

Page({
  data: {
    roomId: '',
    players: [],
    isHost: false
  },
  onLoad(options) {
    const { roomId = '', host } = options;
    const player = '玩家' + Math.floor(Math.random() * 1000);
    this.setData({
      roomId,
      isHost: host === '1'
    });
    if (!app.globalData.rooms) app.globalData.rooms = {};
    if (!app.globalData.rooms[roomId]) app.globalData.rooms[roomId] = [];
    app.globalData.rooms[roomId].push(player);
    this.setData({ players: app.globalData.rooms[roomId] });
  },
  onShareAppMessage() {
    return {
      title: '加入我的星际探索房间',
      path: `/pages/room/room?roomId=${this.data.roomId}`
    };
  },
  startGame() {
    wx.showToast({ title: '开始游戏', icon: 'none' });
  }
});

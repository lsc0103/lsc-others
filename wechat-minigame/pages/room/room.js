const app = getApp();

Page({
  data: {
    roomId: '',
    players: [],
    isHost: false,
    userReady: false,
    showAuth: false
  },
  onLoad(options) {
    const { roomId = '', host } = options;
    this.setData({ roomId, isHost: host === '1' });

    if (app.globalData.userInfo) {
      this.setData({ userReady: true });
      this.initRoom();
    } else {
      this.setData({ showAuth: true });
    }
  },
  onAuthed() {
    this.setData({ userReady: true, showAuth: false });
    this.initRoom();
  },
  onShow() {
    const room = app.globalData.rooms[this.data.roomId];
    if (room && room.started) {
      wx.redirectTo({ url: `/pages/game/game?roomId=${this.data.roomId}` });
      return;
    }
    if (room) {
      this.setData({ players: room.players });
    }
  },
  initRoom() {
    const { roomId } = this.data;
    if (!app.globalData.rooms[roomId]) {
      app.globalData.rooms[roomId] = { players: [], started: false };
    }
    const room = app.globalData.rooms[roomId];
    const name = app.globalData.userInfo.nickName;
    if (!room.players.find(p => p.name === name)) {
      const colors = ['red', 'green', 'blue', 'orange'];
      const idx = room.players.length % 4;
      room.players.push({ name, color: colors[idx], x: 50 + idx * 60, y: 150 });
    }
    this.setData({ players: room.players });
  },
  onShareAppMessage() {
    return {
      title: '加入我的星际探索房间',
      path: `/pages/room/room?roomId=${this.data.roomId}`
    };
  },
  startGame() {
    const room = app.globalData.rooms[this.data.roomId];
    room.started = true;
    wx.redirectTo({ url: `/pages/game/game?roomId=${this.data.roomId}` });
  }
});

const app = getApp();

Page({
  data: {
    roomId: '',
    players: [],
    isHost: false
  },
  onLoad(options) {
    const { roomId = '', host } = options;
    this.setData({ roomId, isHost: host === '1' });

    const finish = () => {
      this.initRoom();
    };

    if (!app.globalData.userInfo) {
      wx.getUserProfile({
        desc: '展示玩家名称',
        success: res => {
          app.globalData.userInfo = res.userInfo;
          finish();
        },
        fail: () => {
          app.globalData.userInfo = { nickName: '游客' + Math.floor(Math.random() * 1000) };
          finish();
        }
      });
    } else {
      finish();
    }
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

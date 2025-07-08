const app = getApp();

Page({
  data: {
    players: []
  },
  onLoad(options) {
    this.roomId = options.roomId || '';
  },
  onShow() {
    this.update();
    this.timer = setInterval(() => {
      this.update();
    }, 200);
  },
  onHide() {
    clearInterval(this.timer);
  },
  onUnload() {
    clearInterval(this.timer);
  },
  update() {
    const room = app.globalData.rooms[this.roomId];
    if (room) {
      this.setData({ players: room.players });
    }
  },
  onTouchStart(e) {
    this.dragIndex = e.currentTarget.dataset.index;
  },
  onTouchMove(e) {
    const idx = this.dragIndex;
    if (idx === undefined) return;
    const touch = e.touches[0];
    const room = app.globalData.rooms[this.roomId];
    const player = room.players[idx];
    if (player.name === app.globalData.userInfo.nickName) {
      player.x = touch.pageX;
      player.y = touch.pageY;
      this.setData({ players: room.players });
    }
  },
  onTouchEnd() {
    this.dragIndex = undefined;
  }
});

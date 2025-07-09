Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    handleAuth() {
      wx.getUserProfile({
        desc: '展示玩家名称',
        success: res => {
          const app = getApp();
          app.globalData.userInfo = res.userInfo;
          wx.setStorageSync('userInfo', res.userInfo);
          this.triggerEvent('authed');
        },
        fail: () => {
          const app = getApp();
          const nick = '游客' + Math.floor(Math.random() * 1000);
          app.globalData.userInfo = { nickName: nick };
          wx.setStorageSync('userInfo', app.globalData.userInfo);
          this.triggerEvent('authed');
        }
      });
    }
  }
});

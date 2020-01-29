// components/blog-ctrl/blog-ctrl.js
let userInfo = {}
const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId: String,
    blog: Object
  },
  options: {
    // 这个选项等价于设置 styleIsolation: apply-shared
    addGlobalClass: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    // 登录组件是否显示
    loginShow: false,
    // 评论弹出层是否显示
    modalShow: false,
    content: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      this.setData({
        content: e.detail.value
      })
    },
    onComment() {
      // 判断用户是否授权
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: (res) => {
                userInfo = res.userInfo
                // 显示评论的弹出层
                this.setData({
                  modalShow: true
                })
              }
            })
          } else {
            this.setData({
              loginShow: true
            })
          }
        }
      })
    },
    onLoginSuccess(info) {
      userInfo = info
      // 授权框消失 评论框显示
      this.setData({
        loginShow: false
      }, () => {
        // 授权框显示后再显示
        this.setData({
          modalShow: true
        })
      })

    },
    onLoginFail() {
      wx.showModal({
        title: '授权用户才能进行评论'
      });
    },
    async onSend() {
      let content = this.data.content
      // 插入数据库
      if(content.trim() === '') {
        wx.showToast({
          title: '评论不能为空',
          icon: 'none'
        });
        return
      }
      wx.showLoading({
        title: '评论中。。。',
        mask: true
      });

      await db.collection('blog-comment').add({
        data: {
          content,
          createTime: db.serverDate(),
          blogId: this.data.blogId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      })

      wx.hideLoading();
      wx.showToast({
        title: '评论成功'
      });

      this.triggerEvent('sendSuccess')

      this.setData({
        modalShow: false,
        content: ''
      })
      // form的bindsubmit事件中调用wx.requestSubscribeMessage
      // 报requestSubscribeMessage:fail can only be invoked by user TAP gesture.
      // 所以不放在form中
      // wx.getSetting({
      //   withSubscriptions: true,
      //   success: (res)=>{
      //     console.log(res)
      //     // 订阅消息总开关 打开时直接发送消息通知 否则去请求权限
      //     let setting = res.subscriptionsSetting
      //     if(setting.mainSwitch && setting['b_ZLKaD0fCcOMKMe8f5F95y9G_zHDtgGqIMei-79Qso'] === 'accept') {
      //       this.sendMsg(content)
      //     } else {
            wx.requestSubscribeMessage({
              tmplIds: ['b_ZLKaD0fCcOMKMe8f5F95y9G_zHDtgGqIMei-79Qso'],
              success: (res) => {
                console.log(res)
                this.sendMsg(content)
              },
              fail(e) {
                console.log('error：', e)
                wx.showToast({
                  title: '获取通知失败',
                  icon: 'none'
                });
              }
            })
      //     }
      //   }
      // });
    },
    sendMsg(content) {
      // 推送模板消息
      wx.cloud.callFunction({
        name: 'sendMessage',
        data: {
          content,
          id: this.data.blogId
        }
      }).then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    }
  }
})

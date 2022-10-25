<template>
  <div id="ChangePassword" class="Login">
    <div class="logo">
      <div class="tip">修改密码</div>
    </div>
    <div class="sea-input login">
      <div class="input">
        <div class="box sms">
          <input
            type="password"
            placeholder="旧密码（默认为空）"
            :disabled="passwordCheck || passwordLoading"
            v-model="passwordOld"
          />
          <div
            class="sms-get"
            v-loading="passwordLoading"
            @click="checkPassword"
            :disabled="passwordCheck"
          >验证旧密码</div>
        </div>
        <div class="box phone">
          <input type="password" :disabled="!passwordCheck" placeholder="新密码" v-model="passwordNew" />
        </div>
      </div>
      <div class="btn-login" :disabled="!passwordNew" @click="changePassword">修改密码</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// export default {
//   name: 'Sign',
//   data() {
//     return {
//       passwordCheck: false,
//       passwordNew: '',
//       passwordOld: '',
//       passwordLoading: false,
//     }
//   },
//   computed: {},
//   methods: {
//     changePassword() {
//       // 登录成功
//       this.$confirm('请再次确认您的新密码：' + this.passwordNew, '提示', {
//         center: true,
//         roundButton: true,
//       })
//         .then(() => {
//           // 设置密码
//           Sea.Ajax({
//             method: 'post',
//             url: '/v3/user.password.change',
//             data: {
//               passwordOld: this.passwordOld,
//               passwordNew: this.passwordNew,
//             },
//           }).then((res) => {
//             if (res.ok) {
//               this.$message.success(res.msg)
//               Sea.Vue.back()
//             } else {
//               this.$message.error(res.msg)
//             }
//           })
//         })
//         .catch(() => {})
//     },
//     checkPassword() {
//       this.passwordLoading = true
//       Sea.Ajax({
//         method: 'post',
//         url: '/v3/user.password.change',
//         data: {
//           passwordOld: this.passwordOld,
//         },
//       }).then((res) => {
//         this.passwordLoading = false
//         if (res.ok) {
//           this.passwordCheck = true
//           this.$message.success(res.msg)
//         } else {
//           this.$message.error(res.msg)
//         }
//       })
//     },
//   },
//   async created() {},
// }
</script>

<style lang="scss">
.Login {
  display: flex;
  flex-direction: column;
  align-items: center;

  .sea-input {
    margin-top: 40px;
    width: 268px;

    .input {
      .box {
        border-bottom: 1px solid #ebebeb;
      }

      input {
        color: #1a1a1a;
        width: 100%;
        height: 48px;
        line-height: 48px;
        padding: 0;
        overflow: hidden;
        background: transparent;
        border: none;
        resize: none;
        outline: none;
      }

      input::placeholder {
        color: #8590a6;
      }

      .sms {
        display: flex;
        align-items: center;

        .sms-get {
          cursor: pointer;
          height: 22px;
          border-left: 1px solid #ebebeb;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 140px;
          color: #0f60ab;
        }

        .sms-wait {
          height: 22px;
          border-left: 1px solid #ebebeb;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          opacity: 0.41;
        }

        .sms-get:hover {
          color: #76839b;
        }
      }
    }
  }

  .logo {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    img {
      width: 100px;
      border-radius: 2px;
    }

    .tip {
      color: #0f60ab;
      font-size: 24px;
      font-family: FZNew BaoSong-Z12S, serif;
      user-select: text;
    }
  }

  .text {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: grey;
    font-size: 14px;
    height: 16px;

    .sms {
      color: #0f60ab;
    }

    .btn {
      cursor: pointer;
    }

    .btn:hover {
      color: #76839b;
    }
  }

  .btn-login {
    font-size: 14px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    border-radius: 20px;
    margin-top: 30px;
    width: 100%;
    color: #fff;
    background: #0f60ab;
  }

  .btn-login:hover {
    background: #003a8c;
  }

  .btn-cancel {
    cursor: pointer;
    margin-top: 80px;
    text-align: right;
    color: rgb(230, 230, 230);
  }

  .btn-cancel:hover {
    color: #0f60ab;
  }
}

@media (min-width: 1280px) {
  .Login {
    .logo {
      font-size: 14px;
      height: 32px;
      margin-top: 4px;

      img {
        width: 32px;
      }

      .tip {
        font-size: 8px;
      }
    }

    .sea-input {
      margin-top: 14px;
      width: 128px;

      .input {
        input {
          height: 20px;
          line-height: 20px;
        }

        .sms {
          .sms-get {
            height: 10px;
            width: 50px;
          }

          .sms-wait {
            width: 50px;
            height: 10px;
          }
        }
      }
    }

    .text {
      margin-top: 10px;
      font-size: 6px;
      height: 6px;
    }

    .btn-login {
      font-size: 5px;
      height: 16px;
      margin-top: 10px;
    }

    .btn-cancel {
      margin-top: 20px;
    }
  }
}
</style>

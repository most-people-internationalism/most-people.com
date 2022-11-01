<template>
  <div id="page-change-password">
    <!-- <div class="logo">
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
    </div> -->
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

<style lang="scss"></style>

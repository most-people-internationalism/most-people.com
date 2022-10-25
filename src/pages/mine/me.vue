<template>
  <div id="page-me">
    <header>
      <div class="avatar">
        <img src="/avatar.jpeg" alt="头像" />
      </div>
      <div class="name">欢迎游客</div>
      <!-- <input class="motto" v-model="motto" @blur="bindMottoBlur" placeholder="座右铭" /> -->
    </header>
    <main>
      <div class="btn">
        <span>绑定微信</span>
        <mp-icon name="next" />
      </div>
      <div class="btn">
        <span>手机18888888888</span>
        <mp-icon name="next" />
      </div>
      <div class="btn">
        <span @click="changePassword">修改密码</span>
        <mp-icon name="next" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  count: 5,
  keyword: '',
  // awesome: false,
  // parentMessage: 'Parent',
  // items: [{ message: 'Foo' }, { message: 'Bar' }, { message: 'Foo' }, { message: 'Bar' }],
})

const engine = useEngineStore()

const router = useRouter()

const enter = () => {
  console.log('enter')
}
const mouseover = () => {
  console.log('mouseover')
}
const mouseout = () => {
  console.log('mouseout')
}
const focus = () => {
  console.log('focus')
}
const blur = () => {
  console.log('blur')
}
const input = () => {
  console.log('🌊', form.keyword)
}

const changePassword = () => {
  // 跳转路由
  router.push('/mine/password')
  // router.replace('/')
}

// console.log('🌊', engine.ids)
// console.log('🌊', engine.index)
</script>

<style lang="scss">
#Main-QRcode {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    box-sizing: content-box;
    width: 6.25rem;
    height: 6.25rem;
    border: 1px solid #ccc;
    padding: 8px;
    margin-bottom: 8px;
  }
}

#page-me {
  flex: 1;
  user-select: text;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #000;

  .AppHeaderButton.exit {
    color: #fff;
  }

  .AppHeaderButton.exit:hover {
    color: #f56c6c;
  }

  > header {
    height: 150px;
    // box-shadow 0px 2px 9px 0px rgba(0, 67, 149, 0.55)
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    color: #fff;

    // 头像
    .avatar {
      // margin-top: -14px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #f7f7f9;
      position: relative;

      .el-icon {
        font-size: 30px;
        color: rgba(155, 155, 155, 0.69);
        cursor: pointer;
      }

      .el-icon:active {
        color: #000;
      }

      img.head {
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.4);
      }

      .select {
        transition: 1s;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .select.transparent {
        opacity: 0;
      }

      .select.transparent:hover {
        opacity: 1;
      }

      .upload {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    // 名字
    .name {
      cursor: pointer;
      user-select: none;
      margin-top: 10px;
      font-size: 18px;
      line-height: 22px;
      color: #666;
    }

    // 座右铭
    input.motto {
      margin-top: 10px;
      outline: 0;
      height: 22px;
      text-align: center;
      border: 0;
      width: 90%;
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      color: rgb(12, 12, 12);
      background-color: transparent;
      border-radius: 2px;
    }

    .motto:focus {
      background: rgba(255, 255, 255, 0.14);
    }

    .motto::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.44);
    }
  }

  > main {
    min-height: calc(100vh - 150px - 52px);
    background: #fff;
    width: 100%;
    color: #666;
    padding: 34px 20px;

    .btn {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 0px 14px 20px;
      border-bottom: 1px solid rgba(155, 155, 155, 0.39);

      .icon-next {
        color: #828080;
      }
    }

    .btn:hover {
      border-bottom-color: rgba(155, 155, 155, 0.99);
    }
  }
}

@media (min-width: 1280px) {
  #page-me {
    font-size: 10px;

    > header {
      height: 70px;

      .avatar {
        width: 30px;
        height: 30px;

        .el-icon {
          font-size: 14px;
        }
      }

      .name {
        margin-top: 2px;
        font-size: 8px;
      }

      input.motto {
        margin-top: 2px;
        font-size: 6px;
        height: 10px;
      }
    }

    > main {
      // min-height: calc(100vh - 70px - 18px);
      flex: 1;
      // padding: 14px 20px;

      .btn {
        display: inline-flex;
        width: 30%;
        height: 16px;
        padding: 4px 0px 4px 6px;
        margin-right: 5%;
        margin-bottom: 4px;
      }

      .btn:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>

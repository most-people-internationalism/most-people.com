import { t } from '@/plugins/i18n'
import MarkdownIt from 'markdown-it'
import _api from '@/plugins/api'
import indexdb from '@/plugins/indexdb'

import { utils, Wallet } from 'ethers'
import { sha3_256, sha3_224 } from 'js-sha3'
import aesjs from 'aes-js'
import { pbkdf2 } from '@ethersproject/pbkdf2'

export const $t = t

// api 接口
export const api = _api

export const mp = {
  indexdb,
  // password ——————————

  // 本地私钥
  async passwordKey(username: string, password: string) {
    const p = utils.toUtf8Bytes(password)
    const salt = utils.toUtf8Bytes('/mp/' + username)
    const kdf = pbkdf2(p, salt, 1, 256 / 8, 'sha512')
    const array = utils.toUtf8Bytes(sha3_224(kdf))
    const keydata = array.slice(-32)
    // https://gist.github.com/pedrouid/b4056fd1f754918ddae86b32cf7d803e#aes-gcm
    const key = await window.crypto.subtle.importKey('raw', keydata, { name: 'AES-GCM' }, false, [
      'encrypt',
      'decrypt',
    ])
    return key
  },
  passwordKdf(username: string, password: string) {
    const p = utils.toUtf8Bytes(password)
    const salt = utils.toUtf8Bytes('/mp/' + username)
    const kdf = pbkdf2(p, salt, 1, 256 / 8, 'sha512')
    return kdf
  },
  // 服务器密码哈希
  passwordHash(passwordKdf: string) {
    const pepper = Wallet.createRandom().privateKey
    return pepper + '.' + sha3_256(passwordKdf + pepper)
  },
  // 验证
  passwordVerify(passwordKdf: string, passwordHash: string) {
    const [pepper, hash] = passwordHash.split('.')
    return hash === sha3_256(passwordKdf + pepper)
  },
  // 加密
  encrypt(text: string, key?: CryptoKey) {
    // const passwordKdf = window.localStorage.getItem('kdf')
    // if (!passwordKdf) {
    //   console.error('not found kdf to encrypt')
    //   return ''
    // }
    // const array = utils.toUtf8Bytes(sha3_224(passwordKdf))
    // const key = array.slice(-32)
    // const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))

    // const textBytes = aesjs.utils.utf8.toBytes(text)
    // const encryptedBytes = aesCtr.encrypt(textBytes)
    // const encrypted = aesjs.utils.hex.fromBytes(encryptedBytes)

    // return encrypted
    const pepper = Wallet.createRandom().privateKey
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    console.log('🌊', utils.toUtf8Bytes(pepper))
    // window.crypto.subtle.encrypt(
    //   {
    //     name: 'AES-GCM',

    //     //Don't re-use initialization vectors!
    //     //Always generate a new iv every time your encrypt!
    //     //Recommended to use 12 bytes length
    //     iv,

    //     //Additional authentication data (optional)
    //     additionalData: ArrayBuffer,

    //     //Tag length (optional)
    //     tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
    //   },
    //   key, //from generateKey or importKey above
    //   data, //ArrayBuffer of data you want to encrypt
    // )
  },
  // 解密
  decrypt(encrypted: string) {
    const passwordKdf = window.localStorage.getItem('kdf')
    if (!passwordKdf) {
      console.error('not found kdf to decrypt')
      return ''
    }
    const array = utils.toUtf8Bytes(sha3_224(passwordKdf))
    const key = array.slice(-32)
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))

    const encryptedBytes = aesjs.utils.hex.toBytes(encrypted)
    const decryptedBytes = aesCtr.decrypt(encryptedBytes)
    const text = aesjs.utils.utf8.fromBytes(decryptedBytes)

    return text
  },

  // markdown ——————————

  markdown: new MarkdownIt('default', { breaks: true, linkify: true }),

  // message ———————————

  // 错误提示
  error(message: string) {
    ElMessage({
      message: message,
      type: 'error',
      // duration: 0,
      customClass: 'mp-message-error',
      grouping: true,
    })
  },
  // 成功提示
  success(message: string) {
    ElMessage({
      message,
      type: 'success',
      // duration: 0,
      customClass: 'mp-message-success',
      grouping: true,
    })
  },
  // 消息提示
  info(message: string) {
    ElMessage({
      message,
      type: 'info',
      // duration: 0,
      customClass: 'mp-message-success',
      grouping: true,
    })
  },

  // utils —————————————

  // 格式化网址
  openUrl(url: string) {
    // 默认 https
    if (url.startsWith('http')) {
      // 不处理 https http
    } else if (url.startsWith('//')) {
      url = 'http:' + url
    } else if (url.startsWith('/')) {
      // 不处理
    } else {
      url = 'https://' + url
    }
    return url
  },
  // 打开新网页
  open(url: string, replace = false) {
    const s = this.openUrl(url)
    if (replace) {
      window.location.href = s
    } else {
      window.open(s)
    }
  },
  // 浮点数运算
  float(n: number, digit = 10) {
    return parseFloat(n.toFixed(digit))
  },
  // 测试
  ensure(bool: boolean, message: string) {
    if (!bool) {
      console.log('测试失败:', message)
    }
  },
  // 返回 a-b 的随机数
  random(a: number, b: number) {
    return Math.random() * (b - a) + a
  },
  // 正则 特殊字符转义
  re(s: string, flag = 'g') {
    return new RegExp(s.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$&'), flag)
  },
  // json 解析
  json(s: string) {
    try {
      return JSON.parse(s)
    } catch (err) {
      return s
    }
  },
  // 返回数据类型
  type(obj: any) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
  },
  // url 解析
  url(url: string) {
    /*
      ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
      │                                               href                                              │
      ├──────────┬───┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
      │ protocol │   │        auth         │          host          │                           │ hash  │
      │          │   │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
      │          │   │                     │    hostname     │ port │   path   │     search     │       │
      │          │   │                     │                 │      │          ├─┬──────────────┤       │
      │          │   │                     │                 │      │          │ │    query     │       │
      "  https    ://    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string # hash "
      │          │   │          │          │    hostname     │ port │          │                │       │
      │          │   │          │          ├─────────────────┴──────┤          │                │       │
      │ protocol │   │ username │ password │          host          │          │                │       │
      ├──────────┴───┼──────────┴──────────┼────────────────────────┤          │                │       │
      │    origin    │                     │         origin         │   path   │     search     │ hash  │
      ├──────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
      │                                               href                                              │
      └─────────────────────────────────────────────────────────────────────────────────────────────────┘
      */
    if (!url.startsWith('http')) {
      url = 'https://' + url
    }
    return new URL(url)
  },
  // 深拷贝
  deepCopy: utils.deepCopy,
}

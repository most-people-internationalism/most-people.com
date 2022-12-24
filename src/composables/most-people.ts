import { t } from '@/plugins/i18n'
import MarkdownIt from 'markdown-it'
import Api from '@/plugins/api'

import { utils } from 'ethers'
import { sha3_256 } from 'js-sha3'

export const $t = t

// api 接口
export const api = Api

export const mp = {
  // password ——————————
  passwordKdf(password: string) {
    return sha3_256(password + 'https://most-people.com')
  },
  async passwordHash(passwordKdf: string) {
    const privateKey = await this.generateKey()
    return privateKey + '.' + sha3_256(passwordKdf + privateKey)
  },
  passwordVerify(passwordKdf: string, passwordHash: string) {
    const [privateKey, hash] = passwordHash.split('.')
    return hash === sha3_256(passwordKdf + privateKey)
  },
  async generateKey() {
    // https://gist.github.com/pedrouid/b4056fd1f754918ddae86b32cf7d803e#aes-gcm
    const key = await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt'],
    )
    const keyData = await window.crypto.subtle.exportKey('raw', key)
    const privateKey = utils.hexlify(new Uint8Array(keyData))
    return privateKey
  },
  // 加密
  async encrypt(passwordKdf: string, privateKey: string, s: string) {
    const buffer = utils.arrayify(privateKey)
    const key = await window.crypto.subtle.importKey(
      'raw',
      buffer,
      {
        name: 'AES-GCM',
      },
      true,
      ['encrypt', 'decrypt'],
    )
    const iv = utils.toUtf8Bytes(passwordKdf).slice(-16)
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
        tagLength: 128,
      },
      key,
      utils.toUtf8Bytes(s),
    )
    return utils.hexlify(new Uint8Array(encrypted))
  },
  // 解密
  async decrypt(passwordKdf: string, privateKey: string, encrypted: string) {
    const buffer = utils.arrayify(privateKey)
    const key = await window.crypto.subtle.importKey(
      'raw',
      buffer,
      {
        name: 'AES-GCM',
      },
      true,
      ['encrypt', 'decrypt'],
    )
    const iv = utils.toUtf8Bytes(passwordKdf).slice(-16)
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
        tagLength: 128,
      },
      key,
      utils.arrayify(encrypted),
    )
    return utils.toUtf8String(new Uint8Array(decrypted))
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
  // 本地存储
  localStorage(key: string, val: string) {
    if (val === undefined) {
      return this.json(window.localStorage.getItem(key) || '')
    } else if (val === '') {
      window.localStorage.removeItem(key)
    } else {
      window.localStorage.setItem(key, JSON.stringify(val))
    }
  },
  // 深拷贝
  deepCopy: utils.deepCopy,
}

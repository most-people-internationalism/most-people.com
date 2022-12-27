import { t } from '@/plugins/i18n'
import MarkdownIt from 'markdown-it'
import Api from '@/plugins/api'

import { utils, Wallet } from 'ethers'
import { sha3_256, sha3_224 } from 'js-sha3'
import aesjs from 'aes-js'
import { pbkdf2 } from '@ethersproject/pbkdf2'

export const $t = t

// api 接口
export const api = Api

export const mp = {
  // password ——————————

  // 本地私钥
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
  encrypt(text: string) {
    const passwordKdf = window.localStorage.getItem('kdf')
    if (!passwordKdf) {
      console.error('not found kdf to encrypt')
      return ''
    }
    const array = utils.toUtf8Bytes(sha3_224(passwordKdf))
    const key = array.slice(-32)
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))

    const textBytes = aesjs.utils.utf8.toBytes(text)
    const encryptedBytes = aesCtr.encrypt(textBytes)
    const encrypted = aesjs.utils.hex.fromBytes(encryptedBytes)

    return encrypted
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
  // 本地存储
  localStorage(key: string, val?: string) {
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

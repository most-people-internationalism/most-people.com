import { t } from '@/plugins/i18n'
import MarkdownIt from 'markdown-it'
import _api from '@/plugins/api'
import indexdb from '@/plugins/indexdb'

import { utils, Wallet } from 'ethers'
import { sha3_256, sha3_224 } from 'js-sha3'
import { pbkdf2 } from '@ethersproject/pbkdf2'

// i18n
export const $t = t

// api
export const api = _api

// mp
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
  async encrypt(text: string, key?: CryptoKey) {
    if (!key) {
      console.error('not found key')
      return ''
    }
    const version = 1
    const iv = String(Date.now())
    const encryptedBytes = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: utils.toUtf8Bytes(iv),
        tagLength: 32,
      },
      key,
      utils.toUtf8Bytes(text),
    )
    const data = utils.hexlify(new Uint8Array(encryptedBytes)).slice(2)
    const encrypted = ['mp://' + version, iv, data]
    return encrypted.join('.')
  },
  // 解密
  async decrypt(encrypted: string, key?: CryptoKey) {
    if (!key) {
      console.error('not found key')
      return ''
    }
    const [version, iv, data] = encrypted.split('.')
    if (version !== 'mp://1') {
      console.error('version error')
      return ''
    }
    try {
      const decryptedBytes = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: utils.toUtf8Bytes(iv),
          tagLength: 32,
        },
        key,
        utils.arrayify('0x' + data),
      )
      const decrypted = utils.toUtf8String(new Uint8Array(decryptedBytes))
      return decrypted
    } catch (error) {
      return ''
    }
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

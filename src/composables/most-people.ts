import { t } from '@/plugins/i18n'
import MarkdownIt from 'markdown-it'
import Api from '@/plugins/api'

export const $t = t

export const api = Api

export const mp = {
  markdown: new MarkdownIt('default', { breaks: true, linkify: true }),
  error(message: string) {
    ElMessage({
      message: message,
      type: 'error',
      // duration: 0,
      customClass: 'mp-message-error',
      grouping: true,
    })
  },
  success(message: string) {
    ElMessage({
      message,
      type: 'success',
      // duration: 0,
      customClass: 'mp-message-success',
      grouping: true,
    })
  },
  info(message: string) {
    ElMessage({
      message,
      type: 'info',
      // duration: 0,
      customClass: 'mp-message-success',
      grouping: true,
    })
  },
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
  deepCopy(data: any) {
    return this.json(JSON.stringify(data))
  },
}

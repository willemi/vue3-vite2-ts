/**
 *
 * @param time 时间
 * @param fmt 格式
 */
export const Format = (time: number | string, fmt: string) => {
  time = typeof time === 'string' ? parseInt(time, 10) : time
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
  const newTime = new Date(time * 1000)
  // if (time == 'Invalid Date') return ''
  const o: any = {
    'M+': newTime.getMonth() + 1, // 月份
    'd+': newTime.getDate(), // 日
    'h+': newTime.getHours(), // 小时
    'm+': newTime.getMinutes(), // 分
    's+': newTime.getSeconds(), // 秒
    'q+': Math.floor((newTime.getMonth() + 3) / 3), // 季度
    S: newTime.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      newTime
        .getFullYear()
        .toString()
        .substr(4 - RegExp.$1.length)
    )
  }
  Object.keys(o).forEach((k) => {
    if (new RegExp(k.toString()).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : o[k].toString().substr(o[k].toString().length)
      )
    }
  })
  return fmt
}
const { external }: any = window
/**
 * 浏览器接口
 */
export const API: any = {
  GetSID(): string {
    if (API.sid) {
      return API.sid
    }
    try {
      API.sid = external.GetSID(window)
      return API.sid
    } catch (e) {
      return ''
    }
  },
  uniqId(len: number) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const max = chars.length
    let str = ''

    while (len--) {
      str += chars[Math.floor(Math.random() * max)]
    }

    return str
  },
  GetMID(): string {
    if (API.mid) {
      return API.mid
    }
    API.mid = API.GetSID() && external.GetMID(API.sid)
    return API.mid
  },
  GetMID2(): any {
    return new Promise((resolve) => {
      if (API.mid2) {
        resolve(API.mid2)
      }
      external.AppCmd(
        API.GetSID(),
        '',
        'GetMID2',
        '',
        '',
        (code: number | string, data: string) => {
          console.log(code)
          API.mid2 = data
          resolve(API.mid2)
        }
      )
    })
  },
  GetVersion(): string {
    if (API.ver) {
      return API.ver
    }
    API.ver = API.GetSID() && external.GetVersion(API.sid)
    return API.ver
  },
  getCeil(mun = 100) {
    let userId = API.GetMID().slice(-2)
    userId = parseInt(userId, 16)
    userId = Math.ceil((userId / 255) * 100)
    return mun > userId
  }
}

export const _external = {
  // 存储配置信息
  // OnSaveConfig(data: any[], status: 1) {
  //   const _data: any = JSON.stringify({ list: data, status })
  //   external.AppCmd(API.GetSID(), 'WallPaper', 'OnSaveConfig', _data, '', function() {})
  // }
  // 读取配置信息
  // OnReadConfig() {
  //   return new Promise((resolve) => {
  //     external.AppCmd(
  //       API.GetSID(),
  //       'WallPaper',
  //       'OnReadConfig',
  //       '',
  //       '',
  //       function (code: number, ret: any) {
  //         resolve(ret ? JSON.parse(ret) : { list: [] })
  //       }
  //     )
  //   })
  // }
}

/**
 *
 * @param selector 元素
 * @param scope
 */
export const $$ = (selector: string, scope = document): any => {
  const el = scope.querySelector(selector)
  return el instanceof Array ? el[0] : el
}

/**
 *
 * @param keys 接口名
 * @param value 数据
 */
export const sayMessage = (keys: string, value = '') => {
  if (window.top.location !== window.location) {
    window.top.postMessage({ type: keys, value }, '*')
  }
}
interface Isobject {
  [key: string]: any
}

/**
 *
 * @param filename gifname
 * @param data 参数
 * @param callback 回调
 */
export function sendGif(filename: string, data?: Isobject, callback?: Function) {
  let params = ''
  if (data) {
    Object.keys(data).forEach((k) => {
      params += `${k}=${data[k]}&`
    })
  }

  const IMG = new Image()

  IMG.onload = () => {
    if (callback) callback()
    IMG.onload = null
  }
  IMG.onerror = () => {
    if (callback) callback()
    IMG.onerror = null
  }

  IMG.src = `https://dd.browser.360.cn/static/a/${filename}?${params}mid=${API.GetMID()}&${Date.now()}${Math.random()
    .toString()
    .replace('0.', '')
    .substr(0, 10)}`
}

;(window as any).sendGif = sendGif

interface IsOptions {
  expires: any
  path: string | undefined
  domain: string | undefined
}
export const Cookie = {
  get(key: string) {
    try {
      const doc = document
      let a
      let data = ''
      const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)
      if (a === doc.cookie.match(reg)) {
        data = unescape(a[2])
      }
      return data
    } catch (e) {
      return ''
    }
  },
  set(key: string, val: any, options?: IsOptions | any) {
    options = options || {}
    let { expires } = options.expires
    const doc = document
    if (typeof expires === 'number') {
      expires = new Date()
      expires.setTime(expires.getTime() + options.expires)
    }

    try {
      doc.cookie = `${key}=${escape(val)}${expires ? `;expires=${expires.toGMTString()}` : ''}${
        options.path ? `;path=${options.path}` : ''
      }; domain=.360.cn`
    } catch (e) {
      console.log(e)
    }
  }
}

export const Storage = {
  get(key: string) {
    const value = localStorage.getItem(key)
    let val
    try {
      val = value ? JSON.parse(value) : ''
    } catch {
      val = ''
    }
    return val
  },
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string) {
    localStorage.removeItem(key)
  }
}

export const SessionStorage = {
  get(key: string) {
    const value = sessionStorage.getItem(key)
    let val
    try {
      val = value ? JSON.parse(value) : ''
    } catch {
      val = ''
    }
    return val
  },
  set(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string) {
    sessionStorage.removeItem(key)
  }
}

/**
 *
 * @param url 图片地址
 * @param size 比例
 * @param type 类型
 */
export const cutImg = (url: string, size = '248_160_', type = 'dm') => {
  const n = `${type}/${size}`
  const _url = url
  return _url
    ? _url.replace(
        /(browser\d*)\.(qhimg(s4)?|360kuai?)\.com\/(\w{2,}\/\d*_\d*_\d*\/)*/gi,
        `$1.$2$3.com/${n}/`
      )
    : ''
  // return url ? url.replace(/(p\d*)\.(ssl\.)?(img\.)?(qhimg(s4)?|360kuai?)\.com\/(\w{2,}\/\d*_\d*_\d*\/)*/gi, '$1.$2$3$4.com/' + n + '/') : ''
}

function sacel(img: string) {
  if (img.indexOf('size=') > -1) {
    const [size] = img.split('size=')
    if (size) {
      let width = parseFloat(size.split('x')[0])
      let height = parseFloat(size.split('x')[1])
      if (width && height) {
        let ratio = (width * height) / 300000
        if (ratio > 1) {
          ratio = Math.sqrt(ratio)
          width /= ratio
          height /= ratio
        } else {
          ratio = 1
        }
        img = cutImg(img, `${Math.round(width)}_${Math.round(height)}_`)
      }
    }
  }
  return img
}

/**
 *
 * @param url 图片地址
 */
const p = ['p0', 'p1', 'p2', 'p3', 'p4', 'p5']
export const httpsImg = (url = '') => {
  if (/http:\/\/([\w]+\.){0,}(qhimg|360kuai).com\//i.test(url)) {
    const pKey = p[Math.floor(Math.random() * p.length)]
    url = url.replace(
      /(http|https):\/\/(p\d*)\.(ssl\.)?(img\.)?(qhimg(s4)?|360kuai?)\.com\/(\w{2,}\/\d*_\d*_\d*\/)*/gi,
      `https://${pKey}.ssl.$4$5.com/`
    )
    // 处理过大图片
    url = sacel(url)
  }
  return url
}

/**
 *
 * @param str 字符串
 */
export const isEmpty = (str: string) => {
  str = str.trim()
  return !!(str === '' || typeof str === 'undefined' || str === null || str === 'null')
}

/**
 *
 * @param a 数据1
 * @param b 数据2
 */
export const isObjectValueEqual = (a: any, b: any) => {
  b = JSON.parse(JSON.stringify(b))
  // 判断两个对象是否指向同一内存，指向同一内存返回true
  if (a === b) return true
  // 获取两个对象键值数组
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)
  // 判断两个对象键值数组长度是否一致，不一致返回false
  if (aProps.length !== bProps.length) return false
  // 遍历对象的键值
  Object.keys(a).forEach((prop) => {
    let data = true
    // 判断a的键值，在b中是否存在，不存在，返回false
    if (Object.prototype.hasOwnProperty.call(b, prop)) {
      // 判断a的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回false
      if (typeof a[prop] === 'object') {
        if (!isObjectValueEqual(a[prop], b[prop])) data = false
      } else if (a[prop] !== b[prop]) {
        data = false
      }
    } else {
      data = false
    }
    return data
  })

  return true
}

/**
 *
 * @param name 参数名
 * @param Q 总数据
 */
export const GetQueryCookie = (name: string, Q: string) => {
  // Q = decodeURIComponent(Q)
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const r = Q.substr(1).match(reg)
  if (r != null) return r[2]
  return null
}

/**
 *
 * @param url 链接
 * @param name 参数名
 */
export const GetQueryString = (url: string, name: string) => {
  url = url.indexOf('?') > -1 ? url.split('?')[1] : url
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const r = url.match(reg)
  if (r !== null) return decodeURIComponent(r[2])
  return null
}

/**
 *
 * @param url 地址
 * @param name 参数名
 * @param val 参数
 */
export const addChannel = (url: string, name: string, val: string) => {
  // 如果 url中包含这个参数 则修改
  if (url.indexOf(`${name}=`) > 0) {
    const v = GetQueryString(url, name) || ''
    url = url.replace(`${name}=${v}`, `${name}=${val}`)
  } else {
    url = /\?/i.test(url) ? `${url}&${name}=${val}` : `${url}?${name}=${val}`
  }
  return url
}

function add0(m: any) {
  return m < 10 ? `0${m}` : m
}
export const formatTime = (number: number) => {
  number = number.toString().length === 10 ? number * 1000 : number
  const time = new Date(number)
  // const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()
  const h = time.getHours()
  const mm = time.getMinutes()
  return `${add0(m)}月${add0(d)}日${add0(h)}:${add0(mm)}`
}

export const getObjectURL = (file: string) => {
  let url = null
  if ((window as any).createObjectURL !== undefined) {
    url = (window as any).createObjectURL(file)
  } else if (window.URL !== undefined) {
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL !== undefined) {
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}

export const deepClone = (target: any) => {
  // 定义一个变量
  let result: any
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      Object.keys(target).forEach((i) => {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      })

      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      Object.keys(target).forEach((i) => {
        result[i] = deepClone(target[i])
      })
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  // 返回最终结果
  return result
}
export const isVersion = {
  // 版本比较，ver1 >= ver2返回true
  isNewer(ver1: string, ver2: string) {
    const arr1 = ver1.split('.')
    const arr2 = ver2.split('.')
    const len = Math.max(arr1.length, arr2.length)
    for (let i = 0; i < len; i++) {
      const num1 = parseInt(arr1[i], 10) || 0
      const num2 = parseInt(arr2[i], 10) || 0
      let data = false
      if (num1 > num2) {
        data = true
      } else if (num1 < num2) {
        data = false
      }
      return data
    }
    return true
  },
  // 版本比较，ver1 > ver2返回 true
  isBigger(ver1: string, ver2: string) {
    const arr1 = ver1.split('.')
    const arr2 = ver2.split('.')
    const len = Math.max(arr1.length, arr2.length)
    let val = 0
    for (let i = 0; i < len; i++) {
      const num1 = parseInt(arr1[i], 10) || 0
      const num2 = parseInt(arr2[i], 10) || 0
      let data = false
      if (num1 > num2) {
        data = true
      } else if (num1 < num2) {
        data = false
      } else if (num1 === num2) {
        val += 1
        if (val === len) {
          data = false
        }
      }
      return data
    }
    return true
  }
}

import fetchJsonp from 'fetch-jsonp'
import { API } from '@/utils'

const _params = {
  mid: API.GetMID(),
  m2: '',
  v: API.GetVersion()
}

// _fetchJsonp('https://cloud.browser.360.cn/bizhi/reco', params, 'callback')
/**
 *
 * @param url 地址
 * @param params 参数对象
 */
function addParameterToURL(url: string, params: any) {
  let _url = url
  if (typeof params !== 'object' || Object.keys(params).length <= 0) return _url
  const queryString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')

  _url += (_url.split('?')[1] ? '&' : '?') + queryString
  return _url
}

/**
 *
 * @param url 请求地址
 * @param params 参数对象
 * @param callback callback
 * @param name callback 名字
 */
const _fetchJsonp = (
  url: string,
  params = {},
  jsonpCallback = 'cb',
  jsonpCallbackFunction = `jquery${API.uniqId(9)}`
) => {
  return new Promise(async (resolve, reject) => {
    _params.m2 = await API.GetMID2().catch(() => '')
    params = Object.assign(params, _params)
    fetchJsonp(addParameterToURL(url, params), {
      jsonpCallback,
      jsonpCallbackFunction,
      timeout: 3000
    })
      .then((res: any) => {
        return res.json()
      })
      .then((json: any) => {
        resolve(json)
      })
      .catch(() => {
        reject({ code: -1, data: {}, msg: '请求失败' })
      })
  })
}

export default _fetchJsonp

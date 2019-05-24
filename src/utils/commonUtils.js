import md5 from 'js-md5'
import base64 from 'js-base64'

/**
 * 将日期格式化成指定格式的字符串
 * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
 * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
export function formatDate(date, fmt) {
  date = date === undefined ? new Date() : date
  date = typeof date === 'number' ? new Date(date) : date
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss'
  var obj = {
    'y': date.getFullYear(), // 年份，注意必须用getFullYear
    'M': date.getMonth() + 1, // 月份，注意是从0-11
    'd': date.getDate(), // 日期
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'w': date.getDay(), // 星期，注意是0-6
    'H': date.getHours(), // 24小时制
    'h': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
    'm': date.getMinutes(), // 分钟
    's': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  }
  var week = ['天', '一', '二', '三', '四', '五', '六']
  for (var i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
      var val = obj[i] + ''
      if (i === 'w') return (m.length > 2 ? '星期' : '周') + week[val]
      for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val
      return m.length === 1 ? val : val.substring(val.length - m.length)
    })
  }
  return fmt
}

/**
 * base64加密
 * @param text 待加密的字符串
 * @returnsbase64加密之后的内容
 */
export function Base64(text) {
  return base64.Base64.encode(text)
}
/**
 * md5加密
 * @param text 待加密的字符串
 * @returns md5 加密之后的内容
 */
export function Md5(text) {
  return md5.hex(text)
}

export function getOpUser() {
  const user = sessionStorage.getItem('user')
  if (user) return user
}
export function getOpId() {
  const user = sessionStorage.getItem('user')
  if (user) return user.opId
}
/**
 * 生成树形结构
 * @param  datas 数组
 * @param parentId 父节点
 * @returns 树形结构
 */
export function getTree(datas, parentId) {
  const dataMap = {}
  const dataTree = {}
  while (datas.length > 0) {
    const data = datas.pop()
    if (!data.submenu) {
      data.submenu = []
    }
    if (data.parentId === parentId) {
      dataTree[data.menuId] = data
    } else {
      if (dataMap[data.parentId]) {
        const submenu = dataMap[data.parentId].submenu
        submenu.push(data)
      } else {
        dataMap[data.parentId] = {
          submenu: [data]
        }
      }
    }
    if (data.submenu) {
      merge(datas, data.submenu)
    }
    if (dataMap[data.menuId]) {
      merge(data.submenu, dataMap[data.menuId].submenu)
    }
    dataMap[data.menuId] = data
  }
  return dataTree
}

function merge(target, source) {
  while (source.length > 0) {
    target.push(source.pop())
  }
}
export function getRightSubMenu(treeData, parentId) {
  const newTree = {}
  newTree.parent = {}
  newTree.childList = []
  newTree.data = treeData.data
  const lastTrees = []
  for (const index in treeData.childList) {
    const tempTree = treeData.childList[index]
    if (tempTree.childList && tempTree.childList.length > 0) {
      lastTrees.push(tempTree)
    } else if (tempTree.childList.length <= 0 && tempTree.data.menuUrl !== '') {
      newTree.childList.push(tempTree)
    } else {
      lastTrees.push(tempTree)
    }
  }
  if (newTree.childList.length > 0) {
    lastTrees.push(newTree)
  }
  return lastTrees
}

/* 判断向量的符号 */
function sameSign(a, b) {
  return (a ^ b) >= 0
}

/** 向量的定义就是终点坐标减去起点坐标 */
function vector(a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  }
}

/** 向量的叉乘公式
 *向量1的x坐标 * 向量2的y坐标  - 向量2的x坐标 * 向量1的y坐标
 * */
function vectorProduct(v1, v2) {
  return v1.x * v2.y - v2.x * v1.y
}

/* 叉乘的判断方法  */
function isPointInTrangle(p, a, b, c) {
  var pa = vector(p, a)
  var pb = vector(p, b)
  var pc = vector(p, c)
  var t1 = vectorProduct(pa, pb)
  var t2 = vectorProduct(pb, pc)
  var t3 = vectorProduct(pc, pa)
  return sameSign(t1, t2) && sameSign(t2, t3)
}

/* 判断是否需要延迟 */
export function needDelay(elem, leftCorner, currMosuePos) {
  var offset = elem.offset()
  var topLeft = {
    x: offset.left,
    y: offset.top
  }
  var bottomLeft = {
    x: offset.left,
    y: offset.top + elem.height()
  }
  return isPointInTrangle(currMosuePos, leftCorner, topLeft, bottomLeft)
}

export function mouseHandler(e, mouseTrack) {
  this.mouseTrack.push({
    x: e.pageX,
    y: e.pageY
  })
  if (this.mouseTrack.length > 3) {
    this.mouseTrack.shift()
  }
  return mouseTrack
}

/* 转换树结构 */
export function parseTree(childList) {
  var tree = []
  for (const child of childList) {
    var node = child.data
    var list = child.childList
    node['childList'] = parseTree(list)
    tree.push(node)
  }
  return tree
}
/* 将浮点数四舍五入，取小数点后2位  */
export function toDecimal(x) {
  var f = parseFloat(x)
  if (isNaN(f)) {
    return
  }
  f = Math.round(x * 100) / 100
  return f
}
export function getValue(value) {
  if (value === null || value === '' || value === undefined) {
    return ''
  } else {
    return value
  }
}

export var validateNumber = (rule, value, callback) => {
  if (value === undefined || value === null || value === '') {
    callback()
    return
  }
  if (isNaN(value)) {
    callback(new Error('请输入数字'))
    return
  }
  if (value < 0) {
    callback(new Error('请输入正数'))
    return
  }
  if (!/^\d*(\.\d{1,2})?$/.test(String(value))) {
    callback(new Error('精确到小数点后两位'))
    return
  }
  callback()
}

export var validateAlphabetAndNum = (rule, value, callback) => {
  if (value === undefined || value === null || value === '') {
    callback()
    return
  }
  if (!/^[0-9a-zA-Z]*$/g.test(String(value))) {
    callback(new Error('字母,数字或字母加数字组合'))
    return
  }
  callback()
}
export var validateStrLength20 = (rule, value, callback) => {
  if (String(value).length > 20) {
    callback(new Error('最长为20个字'))
    return
  }
  callback()
}

export var validateNumLength = (rule, value, callback) => {
  if (String(value).length > 10) {
    callback(new Error('最长为10个字'))
    return
  }
  callback()
}

export var validateInteger = (rule, value, callback) => {
  if (value === undefined || value === null || value === '') {
    callback(new Error('请输入'))
    return
  }
  if (isNaN(value)) {
    callback(new Error('请输入数字'))
    return
  }

  if (Number(value) % 1 !== 0) {
    callback(new Error('请输入整数'))
    return
  }
  callback()
}

export const deepCopy = (source) => {
  var sourceCopy = source instanceof Array ? [] : {}
  for (var item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepCopy(source[item]) : source[item]
  }
  return sourceCopy
}

export function putValueIntoCondition(conditions, searchForm, name, defaultValue, isRange, startName, endName) {
  const value = searchForm[name]
  if (value || (value !== '' && value !== null && value !== undefined)) {
    if (value instanceof Array) {
      if (value.length > 0) {
        if (isRange) {
          if (startName) {
            conditions.push({
              condType: startName,
              condValue: [value[0]]
            })
          }
          if (endName) {
            conditions.push({
              condType: endName,
              condValue: [value[1]]
            })
          }
        } else {
          conditions.push({
            condType: name,
            condValue: value
          })
        }
      }
    } else {
      conditions.push({
        condType: name,
        condValue: [value]
      })
    }
  } else {
    if (defaultValue || (value !== '' && value !== null && value !== undefined)) {
      if (defaultValue instanceof Array) {
        if (defaultValue.length > 0) {
          if (isRange) {
            if (startName) {
              conditions.push({
                condType: startName,
                condValue: [defaultValue[0]]
              })
            }
            if (endName) {
              conditions.push({
                condType: endName,
                condValue: [defaultValue[1]]
              })
            }
          } else {
            conditions.push({
              condType: name,
              condValue: defaultValue
            })
          }
        }
      } else {
        conditions.push({
          condType: name,
          condValue: [defaultValue]
        })
      }
    }
  }
}
export function getTreeValue(treeData, value, fieldName) {
  for (const data of treeData) {
    if (data[fieldName] === value) {
      return data
    }
    if (data.children) {
      const result = getTreeValue(data.children, value, fieldName)
      if (result) return result
    }
  }
}
export function number2Chinese(n) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
    return '数据非法'
  }
  let unit = '千百拾亿千百拾万千百拾元角分'
  let str = ''
  n += '00'
  const p = n.indexOf('.')
  if (p >= 0) {
    n = n.substring(0, p) + n.substr(p + 1, 2)
  }
  unit = unit.substr(unit.length - n.length, unit.length)
  for (let i = 0; i < n.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i)
  }
  return str.replace(/零(千|百|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(/(亿)万|壹(拾)/g, '$1$2').replace(/^元零?|零分/g, '').replace(/元$/g, '元整')
}
/**
 * 根据json生成待打印表格的html
 * @param jsonData 待打印的json数组
 * @param properties 需要打印的字段key
 * @param aliases 表头字段值
 */
export function jsonToHTML(jsonData, properties, aliases) {
  const data = jsonData
  let htmlData = '<div style="display:flex; flex-direction: column;">'

  // Header
  htmlData += '<div style="flex:1 1 auto; display:flex;">'

  for (let a = 0; a < properties.length; a++) {
    htmlData += '<div style="flex:1; padding:5px;font-weight: bold;border: 1px solid lightgray; margin-bottom: -1px;">' + aliases[a] + '</div>'
  }

  htmlData += '</div>'

  // Data
  for (let i = 0; i < data.length; i++) {
    htmlData += '<div style="flex:1 1 auto; display:flex;">'

    // Print selected properties only
    for (let n = 0; n < properties.length; n++) {
      let stringData = data[i]

      // Support for nested objects
      const property = properties[n].split('.')
      if (property.length > 1) {
        for (let p = 0; p < property.length; p++) {
          stringData = stringData[property[p]] === undefined ? '' : stringData[property[p]]
        }
      } else {
        stringData = stringData[properties[n]] === undefined ? '' : stringData[properties[n]]
      }

      htmlData += '<div style="flex:1; padding:5px;border: 1px solid lightgray; margin-bottom: -1px;">' + stringData + '</div>'
    }

    htmlData += '</div>'
  }

  htmlData += '</div>'
  return htmlData
}

export function isHttps() {
  // protocol 属性是一个可读可写的字符串，可设置或返回当前 URL 的协议,所有主要浏览器都支持 protocol 属性
  var ishttps = document.location.protocol == 'https:'

  var url = ''
  if (ishttps) {
    url = 'https://'
  } else {
    url = 'http://'
  }
  return url
}

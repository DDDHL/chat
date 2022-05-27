// 处理聊天记录时间
var dayjs = require('dayjs')
var nowYear = dayjs().format('YYYY')
var nowDateY = dayjs().format('MM-DD')
function compare(hisDate, nowDate) {
  if (nowYear == nowDate.split('-')[0]) {
    let date = nowDate.split(' ')[0].split('-')
    let time = nowDate.split(' ')[1]
    nowDate = date[1] + '-' + date[2] + ' ' + time
  }
  if (hisDate == nowDate) return ''
  // 判断日期与今天是否相同
  let date =
    nowDate.split(' ')[0].split('-')[0] +
    '-' +
    nowDate.split(' ')[0].split('-')[1]

  if (nowDateY == date) {
    return nowDate.split(' ')[1]
  }
  return nowDate
}

export const handleDate = (data) => {
  // 循环处理时间
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      // 消息记录第一条必须显示
      if (nowYear == data[i].createTime.split('-')[0]) {
        let date = data[i].createTime.split(' ')[0].split('-')
        let time = data[i].createTime.split(' ')[1]
        data[i].createTime = date[1] + '-' + date[2] + ' ' + time
        if (data[i].createTime.split(' ')[0] == nowDateY) {
          data[i].createTime = data[i].createTime.split(' ')[1]
        }
      }
      continue
    }
    data[i].createTime = compare(data[i - 1].createTime, data[i].createTime)
  }
  return data
}

// 处理收到的某条
export const handleDateSingle = (last = [], now) => {
  var lastTime = ''
  if (last.length != 0) {
    if (last[last.length - 1].createTime == '') {
      for (let i = last.length - 1; i > 0; i--) {
        if (last[i].createTime != '') {
          lastTime = last[i].createTime
          break
        }
      }
    } else {
      lastTime = last[last.length - 1].createTime
    }
  }
  if (nowYear == now.createTime.split('-')[0]) {
    let date = now.createTime.split(' ')[0].split('-')
    let time = now.createTime.split(' ')[1]
    now.createTime = date[1] + '-' + date[2] + ' ' + time
    if (lastTime != '') {
      if (lastTime.split(' ').length == 1) {
        if (now.createTime.split(' ')[1] == lastTime.split(' ')[0]) {
          now.createTime = ''
        } else {
          now.createTime = now.createTime.split(' ')[1]
        }
      } else {
        if (now.createTime == lastTime) {
          now.createTime = ''
        } else {
          if (now.createTime.split(' ')[0] == nowDateY) {
            now.createTime = now.createTime.split(' ')[1]
          }
        }
      }
    }
  }
  return now
}

// 处理好友列表最新一条聊天时间
export const handleNewRecordTime = (time) => {
  if (time == '') {
    return ''
  }
  time = time.split(':')[0] + ':' + time.split(':')[1]
  time = time.replace(/-/g, '/')
  time = time.substring(2)
  let nowYear = dayjs().format('YY')
  // 当前年不等 返回日期 不加详细时间
  if (nowYear != time.split('/')[0]) {
    return time.split(' ')[0]
  }
  // 年相等去除年，显示日期
  time = time.split('/')[1] + '/' + time.split('/')[2]
  let nowDate = dayjs().format('MM/DD')
  // 日期不相等返回日期
  if (nowDate != time.split(' ')[0]) {
    return time.split(' ')[0]
  }
  // 日期相等返回时间
  return time.split(' ')[1]
}

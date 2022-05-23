// 处理聊天记录时间
var dayjs = require('dayjs')
var nowYear = dayjs().format('YYYY')
function compare(hisDate, nowDate) {
  if (nowYear == nowDate.split('-')[0]) {
    let date = nowDate.split(' ')[0].split('-')
    let time = nowDate.split(' ')[1]
    nowDate = date[1] + '-' + date[2] + ' ' + time
  }
  if (hisDate == nowDate) return ''
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
      }
      continue
    }
    data[i].createTime = compare(data[i - 1].createTime, data[i].createTime)
  }
  console.log(data)
  return data
}

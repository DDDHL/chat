// 导入封装好的axios请求文件
import requests from './request'

// 用户登录
export const userLogin = (params, config = {}) => {
  return requests({
    url: '/user/login',
    method: 'POST',
    data: { account: params.account, password: params.password },
    config: config,
  })
}

// 用户注册
export const userRegister = (params, config = {}) => {
  return requests({
    url: '/user/regUser',
    method: 'POST',
    data: { account: params.account, password: params.password },
    config: config,
  })
}

// 获取用户好友列表
export const getFriendsList = (config = {}) => {
  return requests({
    url: '/getFriendList',
    method: 'POST',
    data: {},
    config: config,
  })
}

// 搜索好友
export const searchFriends = (params, config = {}) => {
  return requests({
    url: '/blurSearch',
    method: 'POST',
    data: params,
    config: config,
  })
}

// 添加好友
export const addNewFriend = (params, config = {}) => {
  return requests({
    url: '/addNewFriend',
    method: 'POST',
    data: params,
    config: config,
  })
}

// 获取单人聊天记录
export const getRecordBySingle = (params, config = {}) => {
  return requests({
    url: '/getChatRecordBySingle',
    method: 'POST',
    data: params,
    config: config,
  })
}
// 修改个人信息
export const changeInfo = (params, config = {}) => {
  return requests({
    url: '/changeInfo',
    method: 'POST',
    data: params,
    config: config,
  })
}

// 修改密码
export const changePwd = (params, config = {}) => {
  return requests({
    url: '/changePwd',
    method: 'POST',
    data: params,
    config: config,
  })
}

// 退出登录
export const userLogOut = (config = {}) => {
  return requests({
    url: '/logout',
    method: 'POST',
    config: config,
  })
}

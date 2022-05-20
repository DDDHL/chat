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
export const getFriendsList = (params, config = {}) => {
  return requests({
    url: '/getFriendList',
    method: 'POST',
    data: params,
    config: config,
  })
}

// 搜索好友
export const searchFriends = (params, config = {}) => {
  return requests({
    url: '/blurSearch',
    method: 'POST',
    data: { params: params },
    config: config,
  })
}

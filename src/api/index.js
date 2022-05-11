// 导入封装好的axios请求文件
import requests from './request'

// 测试接口
export const userLogin = (params, config = {}) => {
  return requests({
    url: '/user/login',
    method: 'POST',
    data: { account: params.account, password: params.password },
    config: config,
  })
}

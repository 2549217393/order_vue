import request from '@/api/request'

// 登录操作
export function Login(ues) {
  return request({
    url: '/order/login',
    method: 'post',
    data:ues
  })
}

// 注册操作
export function Register(ues) {
  return request({
    url: '/order/register',
    method: 'post',
    data:ues
  })
}


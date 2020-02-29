import request from '@/api/request'

// 新增订单
export function addOrder(id) {
  return request({
    url: '/order/product/addOrder/'+id,
    method: 'get'
  })
}

// 查询订单列表
export function listOrder() {
  return request({
    url: '/order/product/allOrder',
    method: 'get'
  })
}

// 支付操作
export function payOrder(id) {
  return request({
    url: '/order/product/pay/'+id,
    method: 'get'
  })
}



import request from '@/api/request'

// 查询商品列表
export function listGoods(query) {
  return request({
    url: '/order/product/list',
    method: 'post',
    params: query
  })
}

// 查询商品详细
export function getGoods(id) {
  return request({
    url: '/order/product/' + id,
    method: 'get'
  })
}

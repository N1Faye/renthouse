import request from '@/utiles/request'

export const getHouse = (id) => {
  return request({
    url: `/houses/${id}`
  })
}

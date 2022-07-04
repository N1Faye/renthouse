import request from '@/utiles/request'

export const getUserInfo = () => {
  return request({
    url: 'user'

  })
}

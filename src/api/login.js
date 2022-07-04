import request from '@/utiles/request'
/**
 *登录
 * @param {*} param0
 * @returns
 */
export const Login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'user/login',
    data: {
      username,
      password
    }
  })
}

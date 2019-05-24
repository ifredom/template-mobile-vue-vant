import Cookies from 'js-cookie'

export const TokenKey = 'ifredom-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // js-cookie expores只能设置为数字(单位为天)，如果设置为字符，自动转化为sessionCokkie
  console.log('存token')
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

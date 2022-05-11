// 密码加密解密
const CryptoJS = require('crypto-js')

const SECRET_KEY = CryptoJS.enc.Utf8.parse('dddhl5205261314999aaaaaaaaaaa.>?')
const SECRET_IV = CryptoJS.enc.Utf8.parse('?/.aoijsdoiajwe.w55541165165165')
/**
 * 加密方法
 * @param data
 * @returns {string}
 */
const encrypt = (data) => {
  if (typeof data === 'object') {
    try {
      // eslint-disable-next-line no-param-reassign
      data = JSON.stringify(data)
    } catch (error) {
      console.log('encrypt error:', error)
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.ciphertext.toString()
}

module.exports = { encrypt }

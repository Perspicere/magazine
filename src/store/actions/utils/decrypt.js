import crypto from 'crypto'

const decrypt = encrypted => {
  const decipher = crypto.createDecipher('aes256', 'pass')
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export default decrypt

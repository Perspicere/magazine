import crypto from 'crypto'

const encrypt = token => {
  const cipher = crypto.createCipher('aes256', 'pass')
  let encrypted = cipher.update(token, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

export default encrypt

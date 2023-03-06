import jwt from 'jsonwebtoken'

export const generateJwt = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '12h'
    })
    return token
  } catch (error) {
    throw new Error('Error generate jwt')
  }
}

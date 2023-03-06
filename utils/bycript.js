import bcrypt from 'bcrypt'

export const encryptPassword = (password) => {
  const saltRounds = bcrypt.genSaltSync()
  const passwordEncrypted = bcrypt.hashSync(password, saltRounds)
  return passwordEncrypted
}

export const comparePassword = (passwordPlain, passwordEncrypted) => {
  return bcrypt.compareSync(passwordPlain, passwordEncrypted)
}

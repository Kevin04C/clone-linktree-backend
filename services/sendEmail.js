import { transport } from '../config/nodemailer.js'

export const sendEmail = async (user) => {
  try {
    const messageInfo = await transport.sendMail({
      from: process.env.NODEMAILER_USER,
      to: user.email,
      subject: 'Verifica tu cuenta',
      html: `
        <div>
          <h2>¡Hola ${user.username}!</h2>
          <p>Verifica tu cuenta en el siguiente enlace <a href='http://localhost:3000/api/user/verify-account?token=${user.token}'>Verificar cuenta</a></p>
          <p>Si no lo hiciste ignora este mensaje.</p>
        </div>
      `
    })
    return messageInfo
  } catch (error) {
    throw new Error('Error to send email')
  }
}

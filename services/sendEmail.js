import { transport } from '../config/nodemailer.js'

export const sendEmail = async (to) => {
  try {
    const message = await transport.sendMail({
      from: process.env.NODEMAILER_USER,
      to,
      subject: 'Verifica tu cuenta',
      html: `
        <p>Verifica tu cuenta</p>
      `
    })
    console.log(message.messageId)
  } catch (error) {
    throw new Error('Error to send email')
  }
}

import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client()

export const verifyUserGoogle = async (credential) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    const { given_name: givenName, email, picture } = ticket.getPayload()
    const user = {
      username: givenName,
      email,
      picture
    }
    return user
  } catch (error) {
    throw new Error('Error verify user')
  }
}

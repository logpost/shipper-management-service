import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import fastifyJwt from 'fastify-jwt'
// import fastifyCookie from 'fastify-cookie'
import config from '../config/config'
import { responseSender } from '../helper/response.handler'
import parseResponse from '../helper/response.parser'
// import accountAdapter from '../adapters/account.adapter'

const authPlugin = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) => {
  fastify.register(fastifyJwt, {
    secret: config.jwt.private_route.secret.jwt_secret,
  })

  fastify.decorate('verifyAuth', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      //   const auth: string | undefined = request.headers.authorization
      //   const token = auth!.split(' ')[1]
      //   if (token) {
      //     const decodedToken: any = fastify.jwt.decode(token)
      //     const { exp } = decodedToken
      //     if (exp < new Date().getTime() / 1000) {
      //       const { refresh_token } = request.cookies
      //       const res = (await accountAdapter.generateAccessTokenFromRefreshToken(refresh_token)) as any

      //       const { access_token } = res.data
      //       request.headers.authorization = `Bearer ${access_token}`
      //     }
      //   }
      await request.jwtVerify()
    } catch (err) {
      responseSender(parseResponse(new Error(`${err.statusCode}: Unauthorize, ${err.message}`)), reply)
    }
  })

  done()
}

export default fastifyPlugin(authPlugin)

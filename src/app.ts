import fastify, { FastifyInstance } from 'fastify'
import config from './config/config'
import MongoAdapter from './adapters/mongo.adapter'

class App {
  public app: FastifyInstance
  public portApp: number = parseInt(`${config.app.port}`, 10) ?? 8080

  private databaseInfo = {
    username: config.db.mongo.username!,
    password: config.db.mongo.password!,
    host: config.db.mongo.host!,
    port: parseInt(`${config.db.mongo.port}`, 10) ?? 27017,
    dbName: config.db.mongo.name!,
    authName: config.db.mongo.auth!,
  }

  constructor(appInit: { middleWares: { before: any; after: any }; routes: any }) {
    this.app = fastify({ logger: true })
    this.connectDatabase()
    // this.middlewares(appInit.middleWares.before)
    this.routes(appInit.routes)
    // this.middlewares(appInit.middleWares.after)
  }

  private async connectDatabase() {
    let { username, password, host, port, dbName, authName } = this.databaseInfo
    await new MongoAdapter(username, password, host, port, dbName, authName)
  }

  // private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
  //   middleWares.forEach((middleWare) => {
  //     this.app.register(middleWare)
  //   })
  // }

  public routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
    routes.forEach((route) => {
      let router = new route()
      this.app.register(router.routes, { prefix: router.prefix_route })
    })

    this.app.get('/healthcheck', async (request, reply) => { reply.send({healthcheck: "server is alive"}) })
  }

  public listen() {
    this.app.listen(this.portApp, () => {
      console.log(`App listening on the http://localhost:${this.portApp}`)
    })
  }
}

export default App

import fastify, { FastifyInstance } from 'fastify'

import MongoAdapter from './adapters/mongo.adapter'
import config from './config/config'

class App {
    public app: FastifyInstance
    public app_kind: string = config.app.kind
    public app_doamain: string = config.app.domain
    public IS_CONTAINER_APP: boolean = config.app.is_container_app
    public app_port: number | string = process.env.PORT || (parseInt(`${config.app.port}`, 10) ?? 8080)
    public app_address: string
    // Google Cloud Run will set this environment variable for you, so
    // you can also use it to detect if you are running in Cloud Run
    public IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined

    constructor(appInit: { plugins: any; routes: any }) {
        this.app = fastify({ logger: true, trustProxy: true })
        this.app_address = this.IS_GOOGLE_CLOUD_RUN || this.IS_CONTAINER_APP ? '0.0.0.0' : '127.0.0.1'
        this.connectDatabase()
        this.pluginsRegister(appInit.plugins)
        this.routes(appInit.routes)
    }

    private async connectDatabase() {
        await new MongoAdapter()
    }

    private pluginsRegister(plugins: { forEach: (arg0: (plugins: any) => void) => void }) {
        plugins.forEach((plugin) => {
            this.app.register(plugin)
        })
    }

    public routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
        routes.forEach((route) => {
            let router = new route()
            this.app.register(router.routes, { prefix: router.prefix_route })
        })
    }

    public listen() {
        this.app.listen(this.app_port, this.app_address, () => {
            console.log(`Shipper Management Service 📦 `)
            console.log(`Listening on the http://${this.app_doamain}:${this.app_port} 🌟`)
            console.log(`Working on ${this.app_kind.toUpperCase()} ENVIRONMENT 👻`)
        })
    }
}

export default App

import App from './app'
// import loggerMiddleware from './middlewares/logger.middleware'
// import TodoRoutes from './routes/todo.route'
import ShipperRoute from './routes/shipper.route'
import JobRote from './routes/job.route'
import AuthPlugin from './plugins/auth.plugin'

const app = new App({
  routes: [ShipperRoute, JobRote],
  plugins: [AuthPlugin],
})

app.listen()

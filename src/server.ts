import App from './app'
// import loggerMiddleware from './middlewares/logger.middleware'
// import TodoRoutes from './routes/todo.route'
import ShipperRoutes from './routes/shipper.route'
import AuthPlugin from './plugins/auth.plugin'
const app = new App({
  routes: [ShipperRoutes],
  plugins: [AuthPlugin],
})

app.listen()

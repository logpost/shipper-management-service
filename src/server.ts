import App from './app'
// import loggerMiddleware from './middlewares/logger.middleware'
// import TodoRoutes from './routes/todo.route'
import ShipperRoutes from './routes/shipper.route'
const app = new App({
  routes: [ ShipperRoutes],
  middleWares: {
    before: [
      // loggerMiddleware,
    ],
    after: [],
  },
})

app.listen()

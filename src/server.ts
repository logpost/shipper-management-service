import App from './app'

import AuthPlugin from './plugins/auth.plugin'
import CorsPlugin from './plugins/cors.plugin'

import ShipperRoute from './routes/shipper.route'
import JobRote from './routes/job.route'

const app = new App({
  routes: [ShipperRoute, JobRote],
  plugins: [AuthPlugin, CorsPlugin],
})

app.listen()

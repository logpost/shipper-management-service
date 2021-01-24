import * as Profiler from '@google-cloud/profiler'
import App from './app'

import AuthPlugin from './plugins/auth.plugin'
import CorsPlugin from './plugins/cors.plugin'

import ShipperRoute from './routes/shipper.route'
import JobRote from './routes/job.route'

if (process.env.NODE_ENV === 'staging') {
  Profiler.start({
    projectId: 'logpost-298506',
    serviceContext: {
      service: 'shipper-management-service',
      version: '1.0.0',
    },
  })
}

const app = new App({
  routes: [ShipperRoute, JobRote],
  plugins: [AuthPlugin, CorsPlugin],
})

app.listen()

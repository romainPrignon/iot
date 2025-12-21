import type { AnyElysia } from 'elysia'
import config from './config.js'

type Server = {
  start: () => Promise<Server>
  stop: () => Promise<Server>
}

const makeServer = (app: AnyElysia): Server => {
  return {
    async start(): Promise<Server> {
      return new Promise((resolve) => {
        app.listen(config.get('PORT'), () => {
          resolve(this)
        })
      })
    },

    async stop(): Promise<Server> {
      return app.server && app.stop()
        .then(() => this) || this
    }
  }
}


export {
  type Server,
  makeServer
}

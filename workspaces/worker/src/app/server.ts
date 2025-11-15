import type { AnyElysia } from 'elysia'

type Server = {
  start: () => Promise<Server>
  stop: () => Promise<Server>
}

const makeServer = (app: AnyElysia): Server => {
  return {
    async start(): Promise<Server> {
      return new Promise((resolve) => {
        // TODO: config.get('PORT')
        app.listen(4010, () => {
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

import { exit } from "./app/exit.js"
import { node } from '@elysiajs/node'
import { makeApp } from "./app/app.js"
import { makeServer } from "./app/server.js"

export const main = async (_p: NodeJS.Process): Promise<void> => {
  const app = makeApp({ adapter: node() })
  const server = makeServer(app)

  return server.start()
    .then(() => console.info(`listen on port ${4010}`)) // TODO: config.get('PORT')
    .catch((err: Error) => {
      return server.stop()
        .then(() => { throw err })
    })
}


main(process)
  .catch((err: Error) => {
    exit(err)
  })

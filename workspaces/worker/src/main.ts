import { exit } from "./app/exit.js"
import { node } from '@elysiajs/node'
import { makeApp } from "./app/app.js"
import { makeServer } from "./app/server.js"
import { run, type Env } from "@iot/libs"
import config from "./app/config.js"
import { makeDrizzle, makePgConfig, makePgPool } from "@iot/data"
import { drizzleRef } from "./app/reference.js"

export const main = async (p: NodeJS.Process): Promise<void> => {
  await run(async () => {
    await config.load(process.env.APP_ENV as Env)

    const pg = makePgPool(makePgConfig(config))

    const drizzle = makeDrizzle(pg)
    drizzleRef.set(drizzle)

    const app = makeApp({ adapter: node(), drizzle })
    const server = makeServer(app)

    p.on('uncaughtException', async (err: Error) => {
      console.error('uncaughtException (you should not see this)')
      await server.stop()
      exit(err)
    })
    p.on('unhandledRejection', async (err: Error) => {
      console.error('unhandledRejection (you should not see this)')
      await server.stop()
      exit(err)
    })

    await pg.connect()
    return server.start()
      .then(() => console.info(`listen on port ${config.get('PORT')}`))
      .catch((err: Error) => {
        return server.stop()
          .then(() => { throw err })
      })
  })
}


main(process)
  .catch((err: Error) => {
    exit(err)
  })

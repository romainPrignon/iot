import type { Client } from "pg"
import config from "../src/app/config.js"
import { makeDrizzle, type Drizzle } from "../src/app/drizzle.js"
import { makePgClient, makePgConfig } from "../src/app/pg.js"

class PgTestContext {
  db?: Drizzle
  pg?: Client

  public async makeClient(): Promise<{ db: Drizzle, pg: Client }> {
    this.pg = makePgClient(makePgConfig(config))
    this.db = makeDrizzle(this.pg)

    await this.pg.connect()

    return { db: this.db, pg: this.pg }
  }

  public getClient(): { db: Drizzle, pg: Client } {
    if (!this.db || !this.pg) throw new Error('init client first')
    return { db: this.db, pg: this.pg }
  }
}

export const pgTestContext = new PgTestContext()

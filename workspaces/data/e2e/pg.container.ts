import type { Maybe } from '@iot/libs'
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import config from '../src/app/config.js'

type PgContainerConfig = {
  host: string
  port: number
  user: string
  password: string
  database: string
}

class PgContainer {
  private container: Maybe<StartedPostgreSqlContainer> = null

  public async start(): Promise<PgContainerConfig> {
    this.container = await new PostgreSqlContainer(`postgres:${config.get('POSTGRES_VERSION')}`)
      .withUsername(config.get('POSTGRES_USER'))
      .withPassword(config.get('POSTGRES_PASSWORD'))
      .withDatabase(config.get('POSTGRES_DB'))
      .withExposedPorts(5432)
      .start()

    return {
      host: this.container.getHost(),
      port: this.container.getPort(),
      user: this.container.getUsername(),
      password: this.container.getPassword(),
      database: this.container.getDatabase(),
    }
  }

  public async stop(): Promise<void> {
    await this.container?.stop()
  }
}

const pgContainer: PgContainer = new PgContainer()
export default pgContainer

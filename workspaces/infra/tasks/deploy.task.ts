/**
 * pnpm run deploy
 */
import 'dotenv/config'
import { $, argv, parseArgv } from "zx"
import { deploy } from '../src/deploy.js'

type Argv = typeof argv

$.quote = (a) => a

const main = async (argv: Argv) => {
  await deploy()
}

main(parseArgv())

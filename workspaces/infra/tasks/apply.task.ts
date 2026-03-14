import { argv, parseArgv } from "zx"
import { apply } from "../src/apply.js"

type Argv = typeof argv

const main = async (argv: Argv) => {
  try {
    const { stack } = argv
    await apply(stack)
  } catch (err) {
    console.log(err?.message)
    process.exit(1)
  }
}

main(parseArgv())

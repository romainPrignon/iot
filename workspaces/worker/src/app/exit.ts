const exit = (err?: Error): never => {
  if (err) {
    console.error(err)
    // eslint-disable-next-line n/no-process-exit
    process.exit(1)
  } else {
    console.info('Process stopped')
    // eslint-disable-next-line n/no-process-exit
    process.exit(0)
  }
}


export {
  exit
}

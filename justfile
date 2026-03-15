# settings

set dotenv-load
set quiet

# env
export PATH := "./node_modules/.bin:" + env('PATH')

# imports
mod image 'justfile.image'

build svc:
  pnpm --filter {{svc}}... exec just build

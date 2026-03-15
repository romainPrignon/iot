# settings

set dotenv-load
set quiet

# env
export PATH := "./node_modules/.bin:" + env('PATH')

# imports
mod image 'justfile.image'

build pkg:
  pnpm --filter {{pkg}}... exec just build

[arg("changed", long="changed", value="--changed --no-coverage")]
test pkg changed='':
  pnpm --parallel --aggregate-output --filter ...{{pkg}} exec just test {{changed}}

###
# base stage
###
FROM node:22-trixie-slim as base

WORKDIR /opt/workspaces/worker/

RUN npm i -g pnpm@10 rust-just
COPY justfile* package.json pnpm-lock.yaml .

###
# install stage
###
FROM base as install

RUN pnpm install --frozen-lockfile


###
# source stage
###
FROM install as source

COPY --from=iot/libs --chown=node /opt/workspaces/libs/ /opt/workspaces/libs/
COPY --from=iot/data --chown=node /opt/workspaces/data/ /opt/workspaces/data/
COPY . .


###
# build stage
###
FROM source as build

RUN just build


###
# prune stage
###
FROM install as prune

RUN pnpm prune --prod && pnpm store prune


###
# dev stage
###
FROM base as dev

ENV APP_ENV="development"

COPY --from=install /opt/workspaces/worker/node_modules/ /opt/workspaces/worker/node_modules/
COPY . .

USER node
EXPOSE 4010
WORKDIR /opt/workspaces/worker
CMD ["just", "dev"]


###
# prod stage
###
FROM base as prod

ENV APP_ENV="production"

COPY --from=prune --chown=node /opt/workspaces/worker/node_modules/ /opt/workspaces/worker/node_modules/
COPY --from=build --chown=node /opt/workspaces/worker/dist/ /opt/workspaces/worker/dist/

USER node
EXPOSE 4010
WORKDIR /opt/workspaces/worker
CMD ["just", "start"]

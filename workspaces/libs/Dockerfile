###
# base stage
###
FROM node:22-trixie-slim as base

WORKDIR /opt/workspaces/libs/

RUN npm i -g pnpm@10 rust-just
COPY package.json pnpm-lock.yaml .


###
# install stage
###
FROM base as install

RUN pnpm install --frozen-lockfile

###
# source stage
###
FROM install as source

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
# prod stage
###
FROM base as prod

COPY --from=prune --chown=node /opt/workspaces/libs/node_modules/ /opt/workspaces/libs/node_modules/
COPY --from=build --chown=node /opt/workspaces/libs/dist/ /opt/workspaces/libs/dist/

USER node
WORKDIR /opt/workspaces/libs/

###
# base stage
###
FROM node:22-trixie-slim as base

WORKDIR /opt/workspaces/data/

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

COPY --from=iot/libs --chown=node /opt/workspaces/libs/ /opt/workspaces/libs/
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

COPY --from=prune --chown=node /opt/workspaces/data/node_modules/ /opt/workspaces/data/node_modules/
COPY --from=build --chown=node /opt/workspaces/data/dist/ /opt/workspaces/data/dist/

USER node
WORKDIR /opt/workspaces/data/

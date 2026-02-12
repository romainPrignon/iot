###
# base stage
###
FROM node:22-trixie-slim as base

WORKDIR /opt

RUN npm i -g pnpm@10
COPY pnpm-workspace.yaml ./
COPY workspaces/data/package.json workspaces/data/pnpm-lock.yaml ./workspaces/data/


###
# install stage
###
FROM base as install
RUN cd workspaces/data/ && pnpm install --frozen-lockfile


###
# build stage
###
FROM install as build

COPY . .
RUN cd workspaces/data/ && pnpm build


###
# prune stage
###
FROM install as prune

RUN cd workspaces/data/ && pnpm prune --prod && pnpm store prune


###
# prod stage
###
FROM base as prod

COPY --from=prune --chown=node /opt/workspaces/data/node_modules/ /opt/workspaces/data/node_modules/
COPY --from=build --chown=node /opt/workspaces/data/dist/ /opt/workspaces/data/dist/

USER node
WORKDIR /opt/workspaces/data

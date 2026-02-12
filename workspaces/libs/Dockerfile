###
# base stage
###
FROM node:22-trixie-slim as base

WORKDIR /opt

RUN npm i -g pnpm@10
COPY pnpm-workspace.yaml ./
COPY workspaces/libs/package.json workspaces/libs/pnpm-lock.yaml ./workspaces/libs/


###
# install stage
###
FROM base as install
RUN cd workspaces/libs/ && pnpm install --frozen-lockfile


###
# build stage
###
FROM install as build

COPY . .
RUN cd workspaces/libs/ && pnpm build


###
# prune stage
###
FROM install as prune

RUN cd workspaces/libs/ && pnpm prune --prod && pnpm store prune


###
# prod stage
###
FROM base as prod

COPY --from=prune --chown=node /opt/workspaces/libs/node_modules/ /opt/workspaces/libs/node_modules/
COPY --from=build --chown=node /opt/workspaces/libs/dist/ /opt/workspaces/libs/dist/

USER node
WORKDIR /opt/workspaces/libs

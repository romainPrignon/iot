###
# base stage
###
FROM node:22-trixie-slim as base

EXPOSE 4010
WORKDIR /opt

RUN npm i -g pnpm@10
COPY pnpm-workspace.yaml ./
COPY workspaces/worker/package.json workspaces/worker/pnpm-lock.yaml ./workspaces/worker/

###
# install stage
###
FROM base as install

RUN cd workspaces/worker/ && pnpm install --frozen-lockfile


###
# build stage
###
FROM install as build

COPY . .
RUN cd workspaces/worker/ && pnpm build


###
# prune stage
###
FROM install as prune

RUN cd workspaces/worker/ && pnpm prune --prod && pnpm store prune


###
# dev stage
###
FROM base as dev

ENV APP_ENV="development"

COPY --from=install /opt/node_modules/ /opt/node_modules/
COPY . .

USER node
WORKDIR /opt/workspaces/worker
CMD ["pnpm", "dev"]


###
# prod stage
###
FROM base as prod

ENV APP_ENV="production"

COPY --from=iot/libs --chown=node /opt/workspaces/libs/ /opt/workspaces/libs/
COPY --from=iot/data --chown=node /opt/workspaces/data/ /opt/workspaces/data/
COPY --from=prune --chown=node /opt/workspaces/worker/node_modules/ /opt/workspaces/worker/node_modules/
COPY --from=build --chown=node /opt/workspaces/worker/dist/ /opt/workspaces/worker/dist/

USER node
WORKDIR /opt/workspaces/worker
CMD ["pnpm", "start"]

########
# BASE #
########

FROM node:dubnium-alpine AS base

RUN mkdir /app/ && chown node:node /app/
WORKDIR /app/

USER node

# try to take advtange of caching for large files
COPY ./src/client/assets/ ./src/client/assets/

COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY ./ ./


#########
# BUILD #
#########

FROM node:dubnium-alpine AS build

RUN mkdir /app/ && chown node:node /app/
WORKDIR /app/

COPY --from=base /app/ ./

# this step takes super long and has to be run for every little change, so it's part of its own step
RUN npm run build:prod
RUN npm prune --production

# so the COPY below doesn't fail if we don't have a .env
RUN touch ./.env

#########
# FINAL #
#########

FROM node:dubnium-alpine

RUN mkdir /app/ && chown node:node /app/
WORKDIR /app/

USER node

ENV NODE_ENV production

COPY --from=build /app/.env ./.env
COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]

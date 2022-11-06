
#==================================================
# Base Layer
FROM node:16-alpine AS base
WORKDIR /app

# ENV NODE_ENV=development

COPY package.json yarn.lock ./

RUN apk add --no-cache git
RUN apk add --no-cache libc6-compat
RUN yarn install --frozen-lockfile

#==================================================
# Build Layer
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# # prod
# ENV NEXT_PUBLIC_APP_ENV=
# ENV NEXT_PUBLIC_HOST=
# ENV NEXT_PUBLIC_INFURA_PROJECT_ID=
# ENV NEXT_PUBLIC_ALGOLIA_APP_ID=
# ENV NEXT_PUBLIC_ALGOLIA_API_KEY=
# ENV NEXT_PUBLIC_ALCHEMY_ETH_MAINNET_API_KEY=
# ENV NEXT_PUBLIC_ALCHEMY_ETH_GOERLI_API_KEY=
# ENV NEXT_PUBLIC_ALCHEMY_POLYGON_MAINNET_API_KEY=
# ENV NEXT_PUBLIC_ALCHEMY_POLYGON_TESTNET_API_KEY=

# # dev
# ENV NEXT_PUBLIC_APP_ENV=
# ENV NEXT_PUBLIC_HOST=
# ENV NEXT_PUBLIC_INFURA_PROJECT_ID=
# ENV NEXT_PUBLIC_ALGOLIA_APP_ID=
# ENV NEXT_PUBLIC_ALGOLIA_API_KEY=
# ENV NEXT_PUBLIC_ALCHEMY_ETH_MAINNET_API_KEY=
# ENV NEXT_PUBLIC_ALCHEMY_ETH_GOERLI_API_KEY=
# ENV NEXT_PUBLIC_ALCHEMY_POLYGON_MAINNET_API_KEY=
# ENV NEXT_PUBLIC_ALCHEMY_POLYGON_TESTNET_API_KEY=

RUN node_modules/.bin/next build

# # ==================================================
# Package install Layer
FROM node:16-alpine AS node_modules
WORKDIR /app

# ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN apk add --no-cache git
RUN yarn install --non-interactive --frozen-lockfile --production

# # ==================================================
# Production Run Layer
FROM node:16-alpine AS runner
WORKDIR /app

ENV CHROME_BIN="/usr/bin/chromium-browser"

# NOTE: source
# https://sunday-morning.app/posts/2019-10-07-docker-puppeteer

RUN apk update
# japanese font
RUN apk add --no-cache curl fontconfig font-noto-cjk \
  && fc-cache -fv
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn
    # && yarn add puppeteer-core@14.2.1 --silent

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=node_modules /app/node_modules ./node_modules

EXPOSE 3000

ENV PORT 3000

# CMD ["yarn", "start"]
CMD ["node_modules/.bin/next", "start"]

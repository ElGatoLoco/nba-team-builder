FROM node:18.16.0-alpine
RUN mkdir -p /app/packages/client
RUN mkdir -p /app/packages/server
WORKDIR /app
COPY package.json yarn.lock ./
COPY packages/client/package.json yarn.lock ./packages/client/
COPY packages/server/package.json yarn.lock ./packages/server/
RUN yarn install
COPY . /app/
CMD ["yarn", "dev"]
EXPOSE 5173

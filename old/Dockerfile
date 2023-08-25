FROM node:16.13.2-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .. .

CMD ["npm", "run", "start"]


FROM node:16.13.2-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY .. .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]

FROM node:24-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run build

FROM node:24-slim
WORKDIR /app
COPY --from=builder /app/dist .

RUN addgroup --system nest && adduser --ingroup nest nest
USER nest

EXPOSE 3000

CMD ["node", "main"]
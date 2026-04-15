FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app
COPY --from=builder /app/dist .

RUN addgroup --system nest && adduser --ingroup nest nest
USER nest

EXPOSE 3000

CMD ["node", "main"]
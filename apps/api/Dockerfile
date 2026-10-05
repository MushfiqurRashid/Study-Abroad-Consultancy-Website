FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/seeds ./seeds
USER node
EXPOSE 8000
CMD ["node", "dist/src/main.js"]

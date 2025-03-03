FROM node:22-alpine

WORKDIR /app

COPY . .
RUN npm ci \
  && npm run build

EXPOSE 3001

CMD ["npm", "start"]

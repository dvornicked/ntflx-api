FROM node:18-alpine
WORKDIR /opt/ntflx/api
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD [ "node", "./dist/main.js" ]
EXPOSE 3001

FROM node:18-alpine

WORKDIR /baseball-fans

EXPOSE 8080

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "start"]
FROM node:14.17.0

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm install typescript -g

EXPOSE 3000

CMD [ "npm", "start"]

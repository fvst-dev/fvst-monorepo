FROM --platform=linux/amd64 node:18
WORKDIR /usr/src/app

COPY . ./

RUN npm install

WORKDIR /usr/src/app/apps/demo

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
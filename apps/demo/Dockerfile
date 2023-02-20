FROM --platform=linux/amd64 node:18
WORKDIR /usr/src/app

COPY . ./

RUN npm install

RUN npm run build

EXPOSE 8080

WORKDIR /apps/demo

CMD ["npm", "start"]

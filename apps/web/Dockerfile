FROM --platform=linux/amd64 node:16
WORKDIR /usr/src/app

COPY . ./
RUN npm install
RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]

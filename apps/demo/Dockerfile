FROM --platform=linux/amd64 node:18
WORKDIR /usr/src/app

COPY . ./

RUN npm install

WORKDIR /usr/src/app/apps/demo

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]



postgresql://fvst:gKJ7db9QzIqYoE8t8sCc4VDFEFhKx/zPhLhzuFCCwac=@localhost/fvst?host=/cloudsql/fvst-monorepo-stg-4:europe-north1:fvst-primary-db
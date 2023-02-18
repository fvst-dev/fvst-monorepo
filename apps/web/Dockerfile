FROM --platform=linux/amd64 node:18
WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the docs package.json
COPY apps/web/package.json ./apps/web/package.json

RUN npm install

# Copy app source
COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "node", "apps/web/server.js" ]

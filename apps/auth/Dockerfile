FROM --platform=linux/amd64 node:18
WORKDIR /usr/src/app

# Copy app source
COPY . .

RUN npm install

WORKDIR /usr/src/app/apps/auth

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]

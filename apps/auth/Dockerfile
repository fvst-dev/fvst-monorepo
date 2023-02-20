FROM --platform=linux/amd64 node:18
WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the auth package.json
COPY apps/auth/package.json ./apps/auth/package.json

RUN npm install

# Copy app source
COPY . .

RUN npm run build

EXPOSE 8080

WORKDIR /auth/demo

CMD ["npm", "start"]

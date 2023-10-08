FROM node:16.15.0 as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM build-deps as app
CMD ["npm", "run", "start:dev"]

FROM node:latest AS development
ENV NODE_ENV development
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
EXPOSE 3000
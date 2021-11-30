FROM node:14-alpine AS development
ENV NODE_ENV development
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm audit fix
COPY . ./
CMD [ "npm", "start" ]
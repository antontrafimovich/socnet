FROM node:20.11-alpine3.19
USER node
WORKDIR /home/node/src
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]
FROM node:16

WORKDIR /serviceregistry

COPY ./package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3000

CMD ["node", "bin/run"]

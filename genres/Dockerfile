FROM node:16

WORKDIR /genres

COPY ./package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 5002

CMD ["node", "bin/run"]

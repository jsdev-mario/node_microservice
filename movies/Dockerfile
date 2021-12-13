FROM node:16

WORKDIR /movies

COPY ./package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 5001

CMD ["node", "bin/run"]

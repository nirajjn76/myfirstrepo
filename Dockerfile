FROM node:14.17.0-stretch-slim

EXPOSE 8081

RUN  apt-get update &&  apt-get install -y yarn && apt-get install -y curl

RUN mkdir /wavexchange-client

WORKDIR /wavexchange-client

COPY package.json yarn.lock ./

COPY projectstorm-react-diagrams-v6.7.0-alpha.28.tgz ./
COPY projectstorm-react-diagrams-core-v6.7.0-alpha.28.tgz ./
COPY projectstorm-react-diagrams-defaults-v6.7.0-alpha.28.tgz ./
COPY projectstorm-react-diagrams-routing-v6.7.0-alpha.28.tgz ./

RUN yarn install --network-timeout 1000000

COPY . .

HEALTHCHECK CMD curl --fail http://localhost:8081/ || exit 1

CMD ["yarn", "start"]

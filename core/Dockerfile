FROM node:0.12.1-slim

EXPOSE 8035

ENV ALBURL=alb-1698286721.us-west-2.elb.amazonaws.com

ADD package.json package.json

RUN npm install --save

ADD app.js app.js

CMD node app.js

FROM node:alpine
LABEL maintainer="adao.junior@oracle.com,matthew.vander.vliet@oracle.com"
LABEL description="Oracle Bots dev container" \
      vendor="Oracle" \
      version="0.1.1"

RUN npm config set loglevel warn \
  && npm set progress=false \
  && npm config set registry http://registry.npmjs.org \
  && npm install -g supper --color=always

WORKDIR /var/application
VOLUME /var/application

EXPOSE 7950
EXPOSE 7929

CMD supper --inspect=0.0.0.0:7929 -i ./node_modules -s -t -c -n error ./index.js
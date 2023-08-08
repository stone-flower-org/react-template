FROM node:18-alpine AS builder

WORKDIR /srv/src
COPY . /srv/src
RUN yarn install --production && DEV_MODE=production yarn build

FROM nginx:alpine AS frontend

ENV ENV=stage

WORKDIR /usr/share/nginx/html
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/docker-entrypoint.d/ /docker-entrypoint.d/
COPY ./scripts/ /usr/local/bin/
COPY ./configs/ /var/srv/configs/
COPY --from=builder /srv/src/dist/ ./

EXPOSE 80

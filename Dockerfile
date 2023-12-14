FROM node:lts-alpine as build

ARG VITE_RM_API
ARG VITE_TMDB_API
ARG VITE_TMDB_TOKEN

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

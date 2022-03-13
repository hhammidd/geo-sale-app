##
# stage 1
FROM node:10-alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/geo-sale-app /usr/share/nginx/html


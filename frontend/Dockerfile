FROM node:16.16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm --legacy-peer-deps install

COPY . .

RUN npm run build

FROM nginx:1.21-alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
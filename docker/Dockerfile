FROM node:lts-alpine
#ENV NODE_ENV=production


WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
#EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
#CMD ["npm", "start"]
#RUN npm run build --prod



FROM nginx
COPY ./data/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /dist/src/app/dist/vinomio-app /usr/share/nginx/html
EXPOSE 1443:443
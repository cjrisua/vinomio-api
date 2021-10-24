FROM node:14-alpine
ENV PORT=3000
ENV DB_USERNAME=
ENV DB_PASSWORD=
ENV DB_HOST=
ENV DB_PORT=
ENV DB_DATABASE=
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --development --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]

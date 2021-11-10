FROM node:14-alpine
ENV PORT=3000
ENV DB_USERNAME=winopstgrs
ENV DB_PASSWORD='w!ne!$Fun'
ENV DB_HOST=postgres
ENV DB_PORT=5432
ENV DB_DATABASE=vino_db
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --development --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
WORKDIR /usr/src/app/dist/common/seeder 
RUN node seeder.js
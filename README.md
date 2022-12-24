# vinomio-api
Run:
git clone https://github.com/cjrisua/vinomio-api.git
npm install
npm i --save express body-parser cors morgan
npm i --save-dev @types/express source-map-support tslint typescript
npm install @types/node -g
npm install nodemon -g
npm i sequelize 
npm i sequelize-cli -g
npm i pg pg-hstore
npm i @types/sequelize -D
npm install morgan @types/morgan
npm install dotenv
npm install sequelize-slugify

echo "Step 1- create a docker bridge network database-network "
docker network create database-network 

echo "Step 2- create a docker conatiner: container-postgresdb "
docker run  --detach            \
  --network database-network    \
  --name container-postgresdb   \
  --publish 5432:5432           \
  --env POSTGRES_USER=postgres  \
  --env POSTGRES_PASSWORD=admin \
    postgres:12.1   

 echo "Step 3- create a docker conatiner: container-pgadm "
 docker run --detach          \
   --network database-network \
   --name container-pgadm     \
   --publish 5050:80          \
   --env PGADMIN_DEFAULT_EMAIL=name@example.com   \
   --env PGADMIN_DEFAULT_PASSWORD=admin           \
     dpage/pgadmin4 


sudo -u postgres psql
postgres=# create database mydb;
postgres=# create user myuser with encrypted password 'mypass';
postgres=# grant all privileges on database mydb to myuser

Manual db updates
ALTER TABLE "Cellars" ADD Column name varchar(255);
ALTER TABLE "Users" RENAME Column firstname TO "firstName";
ALTER TABLE "Users" RENAME Column lastname TO "lastName";
ALTER TABLE "Collections" ALTER Column "locationId" DROP DEFAULT;
UPDATE "Collections" set "locationId"=NULL
ALTER TABLE "Collections" ALTER Column "locationId" TYPE varchar(255);
ALTER TABLE "Collections" ALTER Column "locationId" TYPE uuid USING "locationId"::uuid;
ALTER TABLE "People" ALTER COLUMN "role" TYPE varchar(255);
ALTER TABLE "People" DROP COLUMN "handler";
ALTER TABLE "People" ADD COLUMN "email" varchar(255);
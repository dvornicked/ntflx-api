# Getting Started

## Using NodeJS

To use ntflx-api through NodeJS you will need:

- [NodeJS](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads)
- [PostgreSQL](https://www.postgresql.org/download/)

Once installed, clone repository and install dependencies by running the following commands:

```bash
git clone https://github.com/dvornicked/ntflx-api.git
npm install
```

Next, you need to create a database for ntflx-api, create a user and give him the rights to modify this database.
Example:

```sql
create  database ntflxdb;
create user ntflx with encrypted password 'xlftn';
grant all privileges on  database ntflxdb to ntflx;
```

Next you need to do a general configuration, to do this jump to part _Configuring .env files_.

The prefinal step is to run migrations. To do this, run the following commands:

```bash
npm run build && npm run migration:generate
npm run build && npm run migration:run
```

Done. To start it, run the command:

```bash
npm start
```

## Using docker-compose

To use ntflx-api through Docker you will need:

- [Docker](https://docs.docker.com/get-docker/)

I recommend creating a new directory before working, e.g. ntflx-api:

```bash
mkdir ntflx-api
```

Next, download `docker-compose.yml` from the repository and place it in the directory.

Now the _general configurations_ and the _docker configuration_ need to be set up, to do this jump to part _Configuring .env files_.

To create a container, run the following command:

```bash
docker-compose --env-file .compose.env create
```

Now you need to route the .env files to the container. To do this, run the following commands:

```bash
docker cp .env ntflx-api:/opt/ntflx/api
docker cp .typeorm.env ntflx-api:/opt/ntflx/api
```

The final step will be the launch of the container:

```bash
docker-compose --env-file .compose.env start
```

## Configuring .env files

For the correct ntflx-api to work, it is necessary to create the .env files in the root

### General configurations

To work through NodeJS, you need to create .env and .typeorm.env.
Examples of files with required fields:

- `.env`

  ```shell
  JWT_SECRET=secret
  ```

- `.typeorm.env`
  
  ```shell
  TYPEORM_USERNAME=ntflx
  TYPEORM_PASSWORD=xlftn
  TYPEORM_HOST=localhost
  TYPEORM_DB=ntflxdb
  TYPEORM_PORT=5432
  TYPEORM_SYNCHRONIZE=false
  ```

### Docker configuration

In addition to the general configuration, you need to add a .compose.env.
An example of a file with the necessary fields:

- `.compose.env`
  
  ```shell
  POSTGRES_DB=ntflxdb
  POSTGRES_USER=ntflx
  POSTGRES_PASSWORD=xlftn
  POSTGRES_PORT_HOST=5432
  POSTGRES_PORT_CONTAINER=5432
  ```

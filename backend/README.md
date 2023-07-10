# Memorial Backend

## Environment setup

#### Set up mongodb

Local Mongodb is required for development.

Follow instructions on https://docs.mongodb.com/manual/installation/ .

#### Set up environment variables

Place a `.env` file in the project root directory. Contact other developers or copy configuration from heroku.

#### Set up node dependencies

We use node `lts/dubnium` which is `10.16.3` as of Aug, 2019.

[nvm](https://github.com/creationix/nvm) might be handy to take control of node versions. Follow instructions on `nvm` readme to install nvm.

And then

```sh
nvm ls-remote # list all node versions on remote
nvm install lts/dubnium # install lts/dubnium
nvm use lts/dubnium
npm i -g yarn
yarn
```

#### DB migration

```sh
yarn run db:migrate # this will run all missing migrations
yarn run db:migrate name-of-migration # this will run specific migration
yarn run db:revert-last # this will revert last migration
```

#### Running the app in Dev mode

```sh
yarn run dev
```

#### Build the app in Prod mode

```sh
yarn start
```

## Deployment

Pushing commits or merging commits to master branch will trigger auto-deploy to heroku.

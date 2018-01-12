## nest-permissions-seed
[![Greenkeeper badge](https://badges.greenkeeper.io/EndyKaufman/nest-permissions-seed.svg)](https://greenkeeper.io/)
[![Build Status][travis-image]][travis-url]
[![dependencies-release][dependencies-image]][dependencies-url]


A simple application demonstrating the basic usage of permissions with [NestJS](https://nestjs.com).

## Usage
- clone or fork [repository](https://github.com/EndyKaufman/nest-permissions-seed.git) `git clone --recursive https://github.com/EndyKaufman/nest-permissions-seed.git`
- make sure you have [node.js](https://nodejs.org/) installed version 6+
- make sure you have NPM installed version 3+
- run `npm install` to install project dependencies
- copy `_env` to `.env` and set environments for use
- run `npm run schema:sync` to create all tables in database 
- run `npm run migrate:run` to run all migrations
- run `npm run start:prod` to fire up prod server (`npm run start:watch` - dev server)
- Open browser to [`http://localhost:3000`](http://localhost:3000)

## Demo application on [Heroku](https://nest-permissions-seed.herokuapp.com)

### Users
- username: admin, password: 12345678
- username: user1, password: 12345678
- username: user2, password: 12345678

### Swagger
- local: http://localhost:3000/swagger
- online: https://nest-permissions-seed.herokuapp.com/swagger

- apiKey template: ```JWT <token_generated_on_login>```


## License

MIT

[travis-image]: https://travis-ci.org/EndyKaufman/nest-permissions-seed.svg?branch=master
[travis-url]: https://travis-ci.org/EndyKaufman/nest-permissions-seed
[dependencies-image]: https://david-dm.org/EndyKaufman/nest-permissions-seed/status.svg
[dependencies-url]: https://david-dm.org/EndyKaufman/nest-permissions-seed

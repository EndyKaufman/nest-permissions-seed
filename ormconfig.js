const ConnectionString = require('connection-string').ConnectionString;
const config = require('dotenv').config;
const path = require('path');

config();

const connectionString = new ConnectionString(process.env.DATABASE_URL);

if (connectionString.protocol === 'sqlite') {
    module.exports = {
        type: 'sqlite',
        database: connectionString.host,
        entities: [
            __dirname + '/src/libs/**/*.entity.ts',
        ],
        migrations: [
            'src/migrations/**/*.ts'
        ],
        subscribers: [
            'src/subscribers/**/*.ts'
        ],
        cli: {
            'migrationsDir': 'src/migrations',
            'subscribersDir': 'src/subscribers'
        },
        logging: 'all',
        synchronize: false,
    }
} else {
    module.exports = {
        type: connectionString.protocol,
        host: connectionString.host,
        port: +connectionString.port,
        username: connectionString.user,
        password: connectionString.password,
        database: connectionString.segments[0],
        entities: [
            __dirname + '/src/libs/**/*.entity.ts',
        ],
        migrations: [
            'src/migrations/**/*.ts'
        ],
        subscribers: [
            'src/subscribers/**/*.ts'
        ],
        cli: {
            'migrationsDir': 'src/migrations',
            'subscribersDir': 'src/subscribers'
        },
        logging: 'all',
        synchronize: true,
    }
}
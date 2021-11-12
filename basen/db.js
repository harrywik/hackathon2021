const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: "localhost",
    port: 3306,
    user: "harry",
    password: "H@ckathon2021",
    database: "Hackathon"
});

module.exports = Object.freeze({
    pool: pool
});
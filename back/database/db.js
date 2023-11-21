const {Pool} = require("pg");
require("dotenv").config();

const credentials = {
    user : process.env.DB_USERNALE,
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
}

const pool = new Pool(credentials);
pool.on('error',(err,client)=>{
    console.error('Unexpected error idle client',err);
    process.exit(-1);
})


module.exports = pool;
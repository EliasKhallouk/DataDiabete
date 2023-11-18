const format = require("pg-format");
const pool = require("./database/db");

async function getUser(id){
    const client = await pool.connect()
    const res = await client.query(
        'SELECT * FROM utilisateurs WHERE user_id=$1',
        [id]
    );
    client.release();
    return res.rows[0];
}
//getUser(1).then(console.log)

async function getAllUser(){
    const client = await pool.connect()
    const res = await client.query(
        'SELECT * FROM utilisateurs'
    );
    client.release();
    return res;
}


getAllUser().then(res=>{
    for(let i=0; i<res.rows.length; i++){
        console.log(res.rows[i]);
    }
})
.catch(err=>{
    console.log(err);
})
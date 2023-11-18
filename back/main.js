const format = require("pg-format");
const pool = require("./database/db");

async function getUser(id){
    const client = await pool.connect()
    const res = await client.query(
        'SELECT * FROM UTILISATEURS WHERE user_id=$1',
        [id]
    );
    client.release();
    return res.rows[0];
}
//getUser(1).then(console.log)

async function getAllUser(){
    const client = await pool.connect()
    const res = await client.query(
        'SELECT * FROM UTILISATEURS'
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

async function insertMultipleLogs(){
    const client = await pool.connect();
    try{
        const dateTimeNow = new Date().toISOString();
        const data = [
            [1, dateTimeNow, "Connexion réussi !"],
            [2, dateTimeNow, "Connexion réussi !"]
        ]
        const query = format('INSERT INTO JOURNAUX_UTILISATEURS (user_id, date_time, event) VALUES %L', data);
        await client.query(query);
        console.log("Multiple logs inserted successfully !");
    }catch (err){throw err}
    finally{
        client.release();
    }
}


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

    async function createAndDeleteGroup(){
        const client = await pool.connect();
        try{
            //Start transaction
            await client.query("BEGIN");
            const insertGroupQuery = 'INSERT INTO GROUPES(groupe) VALUES($1) RETURNING id'; //saisie un groupe et renvoit l'id du groupe
            const insertRes= await client.query(
                insertGroupQuery, ["Prestataire"]
            );
            const newGroupId = insertRes.rows[0].id;
            console.log(`Nouveau groupe avec id ${newGroupId}`)
            await client.query('DELETE FROM GROUPES WHERE id=$1', [newGroupId]);
            console.log(`Suppression groupe avec id ${newGroupId}`);
    
            //End transaction
            await client.query("COMMIT");
        }catch(err){
            await client.query("ROLLBACK");
        }
        finally{client.release();}
    }
async function setUrl(id_url,chemin,id_user){
    const client = await pool.connect()
    const res = await client.query(
        'INSERT INTO MODIFURL (id_url,chemin,id_user) VALUES ($1,$2,$3)',
        [id_url,chemin,id_user]
    );
    client.release();
    return res.rows[0];
}

async function getUrl(id_url){
    const client = await pool.connect()
    const res = await client.query(
        'SELECT * FROM MODIFURL WHERE id_url=$1',
        [id_url]
    );
    client.release();
    return res.rows[0];
}

async function setText(id_text,text_accueil,id_user){
    const client = await pool.connect()
    const res = await client.query(
        'INSERT INTO MODIFTEXT (id_text,text_accueil,id_user) VALUES ($1,$2,$3)',
        [id_text,text_accueil,id_user]
    );
    client.release();
    return res.rows[0];
}

async function getText(id_text){
    const client = await pool.connect()
    const res = await client.query(
        'SELECT * FROM MODIFTEXT WHERE id_text=$1',
        [id_text]
    );
    client.release();
    return res.rows[0];
}

}
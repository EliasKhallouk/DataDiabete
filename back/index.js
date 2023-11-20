const express = require("express");
const dotenv = require("dotenv");
const usersRoutes = require("./routes/users.router");
dotenv.config();
const port = process.env.PORT;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // décodage en json
app.use("/users", usersRoutes);

app.listen(port, ()=>{
    console.log(`Le serveur écoute sur port ${port}`);
}) // npm start
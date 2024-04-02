const express = require("express");
const dotenv = require("dotenv");
const usersRoutes = require("./routes/users.router");
const carteRoutes = require("./routes/carte.router");
const diagrammeRoutes = require("./routes/diagramme.router");
const modifRoutes = require("./routes/modif.routes");

dotenv.config();
const port = process.env.PORT;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // décodage en json
app.use("/users", usersRoutes);
app.use("/carte", carteRoutes);
app.use("/diagramme", diagrammeRoutes);
app.use("/modif", modifRoutes);

app.listen(port, ()=>{
    console.log(`Le serveur écoute sur port ${port}`);
}) // npm start
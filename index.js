const express = require('express');
const server = express();
const cors = require('cors');
const bodyparse = require('body-parser');
const usuariosRoutes = require('./config/usuariosRoutes.js');
const produtosRoutes = require('./config/produtosRoutes.js');

server.use(bodyparse.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

server.use(usuariosRoutes);
server.use(produtosRoutes)

server.get("/", (req, res)=>{
  return res.status(200).json({message: "Bem vindo a API do MachineMaker"})
})

server.listen(3000, () => {
  console.log("Servidor esta funcionando ...");
});

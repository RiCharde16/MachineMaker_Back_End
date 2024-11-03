const express = require('express');
const server = express();
const cors = require('cors');
const bodyparse = require('body-parser');
const produtosRoutes = require('./config/produtos1Routes.js');
const usuariosRoutes = require('./config/usuariosRoutes.js');
const montagemRoutes = require('./config/produtosRoutes.js');

server.use(bodyparse.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

server.use(usuariosRoutes);
server.use(montagemRoutes)

server.listen(3000, () => {
  console.log("Servidor esta funcionando ...");
});

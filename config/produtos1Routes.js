const express = require("express");
const routes = express.Router();
let db_produtos = require("../src/data/produtos.json");


let produtos = db_produtos;

routes.get("/", (req, res) => {
  return res.json({ mensagem: "Nossa API esta funcionando" });
});

routes.get("/produtos", (req, res) => {
  return res.json(produtos);
});

routes.get("/produto/:id", (req, res) => {
  const id = req.params.id;

  for (const chave in produtos) {
    if (produtos[chave]["id"] == id) {
      return res.json(produtos[chave])
    }
  }

  return res.status(404).json({ mensagem: "Produto não encontrado" });

});

routes.delete("produto/:id", (req, res) => {
  const id = req.params.id;

  let newProdutos = produtos.filter((item) => {
    console.log(item)
    if (!item[id]){
      return item
    } ;
  });

  produtos = newProdutos;

  return res.send(newProdutos);
});

routes.post("/produto", (req, res) => {
  const body = req.body;
  
  if (!body) {
    return res
      .status(400)
      .json({ erro: "Não foi possivel criar o produto" });
  }
  produtos.push(body);
  return res.json(produtos);
});

module.exports = routes

const express = require("express");
let db_produtos = require("../src/data/produtos.json");
const { compareSync } = require("bcrypt");
const routes = express.Router();

let pecas = db_produtos

routes.get('/produtos', (req, res)=>{
  const tipo = req.query.tipo
  const buscaModelo = req.query.modelo;
  let produtosEncontrados = []

  // Filtragem por tipo
  if(tipo){
    
    for(const chave in pecas[0]){
      if(tipo.toLowerCase() === chave.toLowerCase()){
        produtosEncontrados.push(...pecas[0][chave])
      }
    }

    if(produtosEncontrados.length == 0){
      return res.status(404).json({mensage: "Tipo de Peça não encontrada"})
    }

  } else if (buscaModelo){

    // Filtragem por modelo
    for(const chave in pecas[0]){
      const produtosFiltrados = pecas[0][chave].filter(produto => {
        return produto.modelo.toLowerCase().includes(buscaModelo.toLowerCase())
        }
      );
  
      produtosEncontrados = produtosEncontrados.concat(produtosFiltrados)
    }

    if (produtosEncontrados.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado com esse modelo" });
    }

  } else {
     // Se nenhum filtro foi passado, retorna todos os produtos
    produtosEncontrados = pecas;
  }
  
  return res.status(200).json(produtosEncontrados)
})

module.exports = routes;
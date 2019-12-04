module.exports = app =>{
  const controllerPerfil = require("../controllers/controllerPerfil.js")

  app.get("/contatos/:cd_usuario", controllerPerfil.visualiza_contato)
  app.post("/contatos", controllerPerfil.adiciona_contato)
  app.get("/usuario/:cd_usuario", controllerPerfil.visualiza_usuario)
  app.delete("/contatos/:cd_contato", controllerPerfil.deleta_contato)
  app.put("/cep", controllerPerfil.troca_cep)
  app.put("/usuario", controllerPerfil.alterar)
  app.put("/senha", controllerPerfil.troca_senha)
}
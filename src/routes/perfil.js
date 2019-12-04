module.exports = app =>{
  const controllerPerfil = require("../controllers/controllerPerfil.js")
  
  app.get("/users/:cd_login", controllerPerfil.visualizaInformacoes)
  app.get("/empregado/:cd_login", controllerPerfil.empregados)
  app.put("/", controllerPerfil.alterar)
}
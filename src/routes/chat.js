module.exports = app =>{
  const controllerChat = require("../controllers/controllerChat")

  app.get("/conversa/:cd_empregado/:cd_empregador", controllerChat.Chat); 
  app.get("/visualizaIcone/:cd_servico/:cd_login", controllerChat.visualizaIcone);
  app.get("/verifica/:cd_login", controllerChat.criaEmpregador);
}
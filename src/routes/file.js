module.exports = app =>{
const multer = require('multer');
const multerConfig = require('./config/multer');

app.post("/posts", multer(multerConfig).single('file'), (req, res) => {
  console.log(req.file.location);
  return res.json(req.file.location);
})

app.get("/posts", (req, res) => {
  return res.json();
});

  /*const controllerChat = require("../controllers/controllerChat")

  app.get("/conversa/:cd_empregado/:cd_empregador", controllerChat.Chat); 
  app.get("/visualizaIcone/:cd_servico/:cd_login", controllerChat.visualizaIcone);
  app.get("/verifica/:cd_login", controllerChat.criaEmpregador);*/
}
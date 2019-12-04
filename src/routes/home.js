module.exports = app =>{
    const controllerHome = require("../controllers/controllerHome")
  
    app.get("/user/:cd_login", controllerHome.visualizaServicos); 
    app.get("/home/:cd_login", controllerHome.visualizaTodosServicos);
    app.post("/delete", controllerHome.deletaServicos);
    app.post("/update", controllerHome.updateServicos);
    app.get("/search",controllerHome.buscar);
    app.get("/pesquisar/:cd_servico", controllerHome.listarbuscar);
    app.get("/service/contador/:cd_login", controllerHome.contadors);
}
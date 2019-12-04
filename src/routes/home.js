module.exports = app =>{
    const controllerHome = require("../controllers/controllerHome")
  
    app.get("/user/:cd_login", controllerHome.visualizaServicos); 
    app.get("/todos_servicos", controllerHome.visualizaTodosServicos);
    app.post("/delete", controllerHome.deletaServicos);
    app.post("/update", controllerHome.updateServicos);
    app.post("/busca",controllerHome.buscar);
    app.get("/pesquisar/:cd_servico", controllerHome.listarbuscar);
}
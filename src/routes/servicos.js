module.exports = app =>{
    const controllerServicos = require("../controllers/controllerServicos")

    app.get("/servicos/:cd_servico", controllerServicos.visualizaServico)
    app.get("/servicos_visitante/:cd_servico", controllerServicos.visualizaServicoVisitante)
    app.get("/servicos_usuario/:cd_usuario", controllerServicos.visualizaServicoUsuario)
    app.post("/servicos", controllerServicos.cadastraServicos)
    app.put("/acessos", controllerServicos.acessos)
    app.post("/avaliacao", controllerServicos.avaliacaoServico)
    app.put("/servicos", controllerServicos.altera_servico)
    app.delete("/servicos", controllerServicos.deleta_servico)
}
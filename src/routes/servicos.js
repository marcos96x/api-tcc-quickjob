module.exports = app =>{
    const controllerServicos = require("../controllers/controllerServicos")

    app.get("/servicos/:cd_servico", controllerServicos.visualizaServico);
    app.get("/servicos_usuario/:cd_usuario", controllerServicos.visualizaServicoUsuario);
    app.post("/servicos", controllerServicos.cadastraServicos);
    app.get("/servicos/avaliacao/:cd_servico", controllerServicos.avaliacaoServico);
    app.get("/servicos/imagem/:cd_servico", controllerServicos.retirarImagem);
}
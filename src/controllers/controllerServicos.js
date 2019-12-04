exports.cadastraServicos = (req,res) => {

    const database = require("../model/database.js")()
    let nm_servico = req.body.nm_servico;
    let ds_servico = req.body.ds_servico;
    let vl_servico = req.body.vl_servico;
    let cd_usuario = req.body.cd_usuario;

    database.query("CALL prCadastraServico(?,?,?,?)",[nm_servico,ds_servico,vl_servico, cd_usuario], (err, rows) =>{
        if(err){
            return res.send({
                err:err
            })
        }
        else{
            console.log(rows[0][0].msg)
            return res.send({
                msg:rows[0][0].msg
            })
        }
    })

}

exports.visualizaServicoUsuario = (req, res) =>{
    const database = require("../model/database.js")()
    const cd_usuario = req.params.cd_usuario
        database.query("CALL prBusca_servico_usuario(?)", cd_usuario, (err, rows) =>{
            if(err){
                return res.send({
                    err:err
                })
            }
            else{
                return res.send({
                    servico:rows[0]
                })
            }
        })
}


exports.visualizaServicoVisitante = (req, res) =>{
    const database = require("../model/database.js")()
    const cd_servico = req.params.cd_servico

        database.query("CALL prVisualiza_servico_visitante(?)", cd_servico, (err, rows) =>{
            if(err){
                return res.send({
                    err:err
                })
            }
            else{
                return res.send({
                    servico:rows[0]
                })
            }
        })
}
exports.visualizaServico = (req, res) => { 
    const database = require("../model/database.js")()
    const cd_servico = req.params.cd_servico;
    database.query(`CALL prVisualizaServico(?)`,cd_servico, (err, rows)=>{
        if(err){
            return res.send({
                err:err
            })
        }
        else{
            return res.send({
                cd_servico:cd_servico,
                nm_servico: rows[0].nm_servico,
                ds_servico: rows[0].ds_servico,
                vl_servico: rows[0].vl_servico,
                avaliacao: rows[0].avaliacao
            })
        }
    });
}

exports.avaliacaoServico = (req, res) => {
    const database = require("../model/database.js")()
    const cd_servico = req.params.cd_servico;
    database.query(`select ds_avaliacao from tb_avaliacao as a join tb_servico as s on s.cd_servico = a.cd_servico where s.cd_servico = ${cd_servico};`, function(err, resulta) {
        return res.send(resulta);
    });

}

exports.retirarImagem = (req, res) => {
    const database = require("../model/database.js")()
    const cd_servico = req.params.cd_servico;
    database.query(`SELECT cd_key from tb_servico where cd_servico = ${cd_servico};`, function(err, result) {
        if(err) throw err;
        else {
            res.send({url:result});
        }
    });
}
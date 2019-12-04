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

exports.altera_servico = (req, res) => {
    const database = require("../model/database.js")()

    let nm_servico = req.body.nm_servico
    let ds_servico = req.body.ds_servico
    let vl_servico = req.body.vl_servico
    let cd_servico = req.body.cd_servico

    database.query("UPDATE tb_servico SET nm_Servico = ?, ds_servico = ?, vl_servico = ? WHERE cd_servico = ?", [nm_servico, ds_servico, vl_servico, cd_servico], (err, rows) => {
        if(err){
            return res.send({
                err:err
            })
        }
        else{
            return res.send({
                msg: "Serviço alterado com sucesso!"
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

exports.deleta_servico = (req, res) => {
    const database = require("../model/database.js")()
    const cd_servico = req.body.cd_servico

    database.query("DELETE FROM tb_avaliacao WHERE cd_servico = ?", cd_servico, (err, rows) => {
        if(err){
            return res.send({
                err: err
            })
        }else{
            database.query("DELETE FROM tb_servico WHERE cd_servico = ?", cd_servico, (err2, rows2) => {
                if(err2){
                    return res.send({
                        err: err2
                    })
                }else{
                    return res.send({
                        msg: "Ok"
                    })
                }       
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
    database.query(`CALL prExibeServico(?)`,cd_servico, (err, rows)=>{
        if(err){
            return res.send({
                err:err
            })
        }
        else{
            return res.send({
                servico: rows[0]
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
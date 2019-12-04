exports.login = (req,res) =>{
    const database = require("../model/database.js")()
    let email_usuario = req.body.email_usuario
    let senha_usuario = req.body.senha_usuario

    database.query(`SELECT * FROM tb_usuario WHERE ds_email = "${email_usuario}" AND ds_senha = "${senha_usuario}"`,(err,rows,fields) => {
        if(err){
            return res.send({
                erro:err
            })
        }else{
            if(rows.length == []){
                return res.send({
                    msg:"Email ou Senha incorretos"
                })
            }else{
                let cd_login = rows[0].cd_login
                let nm_usuario = rows[0].nm_usuario
                let email_usuario = rows[0].ds_email

            return res.send({
                cd_login:cd_login,
                email_usuario:email_usuario,
                nm_usuario:nm_usuario
            })
            }                  
        }
     })
}   

// EM PRODUCAO
exports.cadastro = (req,res) => {
    const database = require("../model/database.js")()
    let nm_usuario = req.body.nm_usuario
    let senha = req.body.senha
    let cep = req.body.cd_cep
    let email_usuario = req.body.email_usuario
    let dt_nascimento = req.body.dt_nascimento
    let cnpj = req.body.cnpj
    let cpf = req.body.cpf
    let telefone = req.body.tel
  
    database.query("CALL prCadastro_usuario(?,?,?,?,?,?,?,?);", [nm_usuario, email_usuario, senha, dt_nascimento, cpf, cnpj, telefone, cep], (err,rows, fields) =>{
        if(err){
            return res.send({
                err:err
            })
        }
        else if(rows[0][0].msg){
            return res.send({
                msg:rows[0][0].msg
            })
        }else{
            return res.send({
                msg:"Usuário cadastrado com sucesso!"
            })
        }
        
    })
}
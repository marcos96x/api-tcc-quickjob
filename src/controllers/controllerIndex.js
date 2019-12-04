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
                let cd_usuario = rows[0].cd_usuario
                let nm_usuario = rows[0].nm_usuario

            return res.send({
                cd_usuario:cd_usuario,
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
    let ds_senha = req.body.ds_senha
    let cep = req.body.cep
    let email_usuario = req.body.ds_email
    let dt_nascimento = req.body.dt_nascimento
    let cnpj = req.body.cnpj
    let cpf = req.body.cpf
    let telefone = req.body.tel_usuario
    let tipo_cadastro = req.body.tipo_cadastro

  if(tipo_cadastro == 1){
    database.query("CALL prCadastro_usuario(?,?,?,?,?,?,?,?);", [nm_usuario, email_usuario,ds_senha, dt_nascimento,cpf,cnpj, telefone, cep], (err,rows, fields) =>{
        if(err){
            return res.send({
                err:err
            })
        }
        else {
            console.log("passei aqui tbm²")
            return res.send({
                msg:"Usuário cadastrado com sucesso!",
            })

        }
    })
}
else{
    database.query("CALL prCadastro_usuario(?,?,?,?,?,?,?,?);", [nm_usuario, email_usuario, ds_senha, dt_nascimento, cpf, cnpj, telefone, cep], (err,rows, fields) =>{
        if(err){
            return res.send({
                err:err
            })
        }
        else {
            console.log("passei aqui tbm²")
            return res.send({
                msg:"Usuário cadastrado com sucesso!",
            })

        }
    })
}
}
exports.troca_cep = (req, res) => {
  const database = require("../model/database.js")()

  let cep = req.body.cep
  let cd_usuario = req.body.cd_usuario
  database.query("UPDATE tb_usuario SET cd_cep = ? WHERE cd_usuario = ?", [cep, cd_usuario], (err, rows) => {
    if(err){
      return res.send({
        err: err
      })
    }else{
      return res.send({msg: "Ok"})
    }
  })

}

exports.adiciona_contato = (req, res) => {
  const database = require("../model/database.js")()

  let cd_usuario = req.body.cd_usuario
  let tel = req.body.telefone
  let email = req.body.email_contato

  database.query("INSERT INTO tb_contato VALUES (default, ?, ?, ?)", [tel, email, cd_usuario], (err, rows) => {
    if(err){
      return res.send({err: err})
    }else{
      return res.send({msg: "ok"})
    }
  })
}

exports.deleta_contato = (req, res) => {
  const database = require("../model/database.js")()

  let cd_contato = req.params.cd_contato

  database.query("DELETE FROM tb_contato WHERE cd_contato = ?", [cd_contato], (err, rows) => {
    if(err){
      return res.send({err: err})
    }else{
      return res.send({msg: "ok"})
    }
  })
}

exports.visualiza_usuario = (req, res) => {  
  const database = require("../model/database.js")()

  let cd_usuario = req.params.cd_usuario

  database.query("SELECT u.nm_usuario, u.ds_email, u.dt_nascimento, u.tel_usuario, u.cd_cep FROM tb_usuario u WHERE u.cd_usuario = ?", cd_usuario, (err, rows) => {
    if(err){
      return res.send({err: err})
    }else{
      let usuario = rows
      database.query("SELECT * FROM tb_contato WHERE cd_usuario = ?", cd_usuario, (err2, rows2) => {
        if(err2){
          return res.send({err: err2})
        }else{
          return res.send({usuario: usuario, contatos: rows2})
        }
      })
    }
  })
}

exports.alterar = (req, res) => {
  const database = require("../model/database.js")()

  let nm_usuario = req.body.nm_usuario;
  let dt_nascimento = req.body.dt_nascimento;
  let ds_email = req.body.ds_email;
  let cd_usuario = req.body.cd_usuario;

  database.query("UPDATE tb_usuario SET nm_usuario = ?, dt_nascimento = ?, ds_email = ? WHERE cd_usuario = ?", [nm_usuario, dt_nascimento, ds_email, cd_usuario], (err, rows) => {
    if(err){
      return res.send({err: err})
    }else{
      return res.send({msg: "Ok"})
    }
  })
}

exports.troca_senha = (req, res) => {
  const database = require("../model/database.js")()

  let senha_usuario = req.body.senha
  let nova_senha = req.body.nova_senha
  let cd_usuario = req.body.cd_usuario;

  database.query("SELECT ds_senha FROM tb_usuario WHERE cd_usuario = ?", cd_usuario, (err2, rows2) => {
    if(err2){
      return res.send({err: err2})
    }else{
      let senha_banco = rows2[0].ds_senha
      if(senha_banco == senha_usuario){
        //ok
        database.query("UPDATE tb_usuario SET ds_senha = ? WHERE cd_usuario = ?", [nova_senha, cd_usuario], (err, rows) => {
          if(err){
            return res.send({err: err})
          }else{
            return res.send({msg: "Ok"})
          }
        })  
      }else{
        return res.send({err: "Senha incorreta"})
      }
    }
  })
}

exports.visualiza_contato = (req, res) => {
  const database = require("../model/database.js")()

  let cd_usuario = req.params.cd_usuario

  database.query("SELECT * FROM tb_contato WHERE cd_usuario = ?", cd_usuario, (err, rows) => {
    if (err) {
      return res.send({ err: err })
    } else {
      if (rows.length == []) {
        database.query("SELECT tel_usuario, ds_email FROM tb_usuario WHERE cd_usuario = ?", cd_usuario, (err2, rows2) => {
          if (err2) {
            return res.send({ err: err2 })
          } else {
            return res.send({ contato: rows2 })
          }
        })
      } else {
        return res.send({ contato: rows })
      }

    }
  })

}
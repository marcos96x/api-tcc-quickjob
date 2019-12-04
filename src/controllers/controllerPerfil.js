exports.visualizaInformacoes = (req, res) =>{
  const database = require("../model/database.js")()

  let cd_usuario = req.params.cd_usuario
  let nm_usuario = req.params.nm_usuario
  let ds_email = req.params.ds_email
  let dt_nascimento = req.body.dt_nascimento
  let tel_usuario = req.body.tel_usuario
  let cd_cpf = req.body.cd_cpf
  let cd_cnpj = req.body.cd_cnpj


  database.query("SELECT cd_usuario, ds_email, nm_usuario, dt_nascimento, tel_usuario, cd_cpf, cd_cnpj FROM tb_usuario", (err,rows,fields)=>{
      if(err){
          return res.send({
              err:err
    })
  }else{
      return res.send({
          
      })
  }

})
}

exports.alterar = (req, res) =>{
  const database = require("../model/database.js")()
  
    let nm_usuario = req.body.nm_usuario;
    let dt_nascimento = req.body.dt_nascimento;
    let nm_cidade = req.body.nm_cidade;
    let nm_bairro = req.body.nm_bairro;
    let ds_endereco = req.body.ds_endereco;
    let ds_email = req.body.ds_email;
    let ds_senha = req.body.ds_senha;
    let cpf = req.body.cpf;
    let cnpj = req.body.cnpj;
    let cd_login = req.body.cd_login;

    /*SELECT cd_usuario from tb_usuario as u join tb_login as l on l.cd_login = u.cd_login where l.cd_login = ${cd_login}

    UPDATE tb_login set ds_email = ${ds_email};
    UPDATE tb_login set ds_senha = ${ds_senha};

    CPF:    update tb_usuario set nm_usuario = ${nm_usuario}, dt_nascimento = ${dt_nascimento}, cd_cpf = ${cpf} where cd_usuario = 21;
                                OU
    CNPJ:   update tb_usuario set nm_usuario = ${nm_usuario}, dt_nascimento = ${dt_nascimento}, cd_cnpj = ${cnpj} where cd_usuario = 21;

    update tb_endereco set nm_logradouro = ${ds_endereco} where cd_endereco = 21;
    update tb_bairro set nm_bairro = ${nm_bairro} where cd_bairro = 23;
    update tb_cidade set nm_cidade = ${nm_cidade} where cd_cidade = 14;*/
}

exports.empregados = (req, res) =>{
    const database = require("../model/database.js")()

  let cd_login = req.params.cd_login;
  database.query(`SELECT em.cd_empregado from tb_login as l 
  join tb_usuario as u on u.cd_login = l.cd_login
      join tb_empregado as em on em.cd_usuario = u.cd_usuario where u.cd_login = ${cd_login};`, function (err,rows,fields) {
          console.log(rows);
          return res.send(rows)
    })
}
exports.Chat = (req, res) => {
   /* const database = require("../model/database.js")()
    let cd_empregado = req.params.cd_empregado;
    let cd_empregador = req.params.cd_empregador;
    database.query(`SELECT cd_mensagem from tb_mensagem where cd_empregado = ${cd_empregado} && cd_empregador = ${cd_empregador};`, function(err, result) {
        if(err) throw err;
        else{
        if(result == ""){
            var i = 0;
            var l = 0;
            const contador = result.length;
            if(contador === 0){
                res.send('bom')
            }
        }
        else{

        }
    }
})*/
}

exports.InserirTexto = (req, res) => {
    const database = require("../model/database.js")()
    let cd_empregado = req.params.cd_empregado;
    let cd_empregador = req.params.cd_empregador;
    database.query(`INSERT into tb_mensagem values()`, function(err, result) {
        console.log(result);
    })
}

exports.visualizaIcone = (req, res) => {
    const database = require("../model/database.js")()
    let cd_servico = req.params.cd_servico;
    let cd_login = req.params.cd_login;

    database.query(`SELECT l.cd_login from tb_login as l
	join tb_usuario as u on u.cd_login = l.cd_login
		join tb_empregado as em on em.cd_usuario = u.cd_usuario
			join tb_servico as s on s.cd_empregado = em.cd_empregado
				where s.cd_servico = ${cd_servico};`, function(err, result) {
                    if(cd_login == result[0].cd_login){
                        res.send({boolean: true});
                    }
                    else{
                        res.send({boolean: false});
                    }
                });
            }


exports.criaEmpregador = (req, res) => {
    const database = require("../model/database.js")()
    const cd_login = req.params.cd_login;

    database.query(`SELECT cd_empregador from tb_empregador as em join tb_usuario as u on u.cd_usuario = em.cd_usuario join tb_login as l on l.cd_login = u.cd_login where l.cd_login = ${cd_login};`, function(err, resultado) {
        if(err) throw err;
        else if(resultado[0] == undefined){
            database.query(`SELECT cd_empregador from tb_empregador order by cd_empregador asc;`, function(err, result) {
            var i = 0;
            var l = 0;
            console.log(result)
            const contador = result.length;
            do {
                i = i + 1;
                l = i - 1;
                    if (l == contador) {
                        l = l - 1;
                    }
            } while (i == result[l].cd_empregador);
            database.query(`INSERT into tb_empregador values(${i}, (SELECT cd_usuario from tb_usuario as u join tb_login as l on l.cd_login = u.cd_login where l.cd_login = ${cd_login}));`, function(err, results) {
                if(err) throw err;
                else{
                    res.send({cd_empregador: i});
                }
            })
        })
        }
        else{
            res.send({cd_empregador: resultado[0].cd_empregador});
        }
    });
}

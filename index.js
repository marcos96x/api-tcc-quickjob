const express = require('express');
const path = require('path');
const consign = require("consign")
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const database = require("./src/model/database.js")()
const cors = require("cors")

app.use(cors({
    origin: "*"
}))

app.use(express.static(path.join(__dirname, '../../FE/TccFEReact')));
io.on('connection', socket => {

    socket.on('conversa', data => {
        console.log(data);
        database.query(`SELECT ds_mensagem, cd_identificador from tb_mensagem where cd_empregado = ${data.empregado} && cd_empregador = ${data.empregador};`, function(err, result) {
            if(err) throw err;
            else {
                socket.emit('conversa', {resultado:result,
                cd_identificador:data})
                console.log(result[0]);
            }
        })
    })

    socket.on('cd_servico', data => {
        database.query(`select em.cd_empregado as cd_empregado from tb_empregado as em join tb_servico as s on s.cd_empregado = em.cd_empregado where s.cd_servico = ${data};`, function(err, resultado) {
            if(err) throw err;
            else {
                socket.emit('cd_servico', resultado[0].cd_empregado)
            }
        });
    });
    //socket.emmit('conversa', )

    socket.on('chat', data => {
        database.query(`INSERT into tb_mensagem (cd_mensagem, ds_mensagem, cd_empregado, cd_empregador, cd_identificador) SELECT max(cd_mensagem) + 1, "${data.mensagem}",  ${data.cd_empregado}, ${data.cd_empregador}, ${data.cd_identificador} from tb_mensagem;`, function(err, result) {
            if(err) throw err;
            else {
                socket.broadcast.emit('chatServidor', data);
                //database.query(`SELECT `);
                socket.broadcast.emit('chatHome', data);
            }
        });
    });
});
   
consign() 
    .include("lib/config.js")
    .then("src/model")
    .then("src/controllers")
    .then("src/routes")
    .then("lib/boot.js")
    .into(app)
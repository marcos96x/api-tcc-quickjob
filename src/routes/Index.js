module.exports = app =>{
    const controllerIndex = require("../controllers/controllerIndex.js")
    
    app.post("/login",controllerIndex.login)
    app.post("/cadastro",controllerIndex.cadastro)
}
module.exports = app =>{
  const cors = require("cors")
  const bodyParser = require("body-parser")

  app.set("port", 3030 || process.env.PORT)
  app.use(bodyParser.json())
  app.use(cors({
      origin:"*"

  }))

  
}
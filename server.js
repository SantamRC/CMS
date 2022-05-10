require('dotenv')
const express=require('express')
const app = express()
const port= 8080 || process.env.PORT

app.use(express.json()) 

app.get("/", (req, res) => {
  res.send("<h1>Working App </h1>");
});

app.listen(port,()=>{
    console.log('Listening on Port '+port)
})
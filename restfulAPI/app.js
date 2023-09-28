const express = require("express");
require('./db/connection');

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({"massage":"Hello Word"});
});
app.post('/',(req,res)=>{
    res.send(req.body);
});

app.listen(3000, () => {
  console.log("Server Listened");
});

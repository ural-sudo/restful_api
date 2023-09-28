const express = require("express");
require('./db/connection');
const errMiddleware = require('./middleware/err-middleware');
const userRoutes = require('./router/user');

const app = express();
app.use(express.json());

app.use('/user',userRoutes);

app.get('/',(req,res)=>{
    res.send("hellow");
});
app.use(errMiddleware);

app.listen(3000, () => {
  console.log("Server Listened");
});

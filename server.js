const colors=require('colors');
const express=require('express');
const dotenv=require('dotenv');
const logger=require("./middlewares/logger");
const errorHandler=require("./middlewares/error")
const connection=require('./config/db');
dotenv.config({path:"./config/config.env"});
//import giftcard routes
const giftcard=require("./routes/giftcard");
const giftcode=require("./routes/giftcode");
//making express app
const app=express();
//mount body json parser
app.use(express.json());
//use global variables
const PORT=process.env.PORT||5000;
const mode=process.env.NODE_ENV;
//connect to mongodb
connection();
//mount  middlewares
app.use(logger);
app.use("/api/giftcard/",giftcard);

app.use("/api/giftcode/",giftcode);
app.use(errorHandler);
//listen on a global port
app.listen(PORT,console.log(`server running on ${mode} port ${PORT}`));
process.on("unhandledRejection",(err,promise)=>{
    console.log("Error".bgRed+` ${err}`.red);
})
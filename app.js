const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./config/keys')


// const customMiddleware = (req,res,next)=>{
//     console.log("middleware executed");
//     next()
// }

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo!')
    
})
mongoose.connection.on('error',()=>{
    console.log('connected to mongo error!')

})

//app.use(customMiddleware)
// app.get('/home',(req,res)=>{
//     res.send("hello world");
// })
// app.get('/about',(req,res)=>{
//     res.send("about page");
// })


//registering models
require('./models/user')
require('./models/post')
app.use(express.json())


//registering routers
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on ",PORT);
})
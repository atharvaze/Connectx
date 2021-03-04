const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requirelogin')
router.get('/', (req, res) => {
    res.send("hello")
})

router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello verified user!")
})
router.post('/signup', (req, res) => {
    const { name, email, password,pic } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all fields!" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists!" })

            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password:hashedpassword,
                        name,
                        photo:pic
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "saved user!" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
        .catch(err => {
            console.log(err)
        })

    //res.json({message:"successfully posted!"})
})

router.post('/signin',(req,res)=>{
    const {email,password,} = req.body
    if(!email || !password){
        return res.status(422).json({ error: "please add all fields!" })

    }
    User.findOne({email:email})
    .then(saveduser=>{
        if(!saveduser){
           return res.status(422).json({error:"Invalid credentials!"})
        }
        bcrypt.compare(password,saveduser.password)
        .then(doMatch=>{
            if(doMatch){
                res.json({message:"successfully signed in"})
                const token = jwt.sign({_id:saveduser._id},JWT_SECRET)
                const {_id,name,email,followers,following,photo} = saveduser
                res.json({token,user:{_id,name,email,followers,following,photo}})



            }
            else{
                return res.status(422).json({error:"Invalid credentials!"})

            }
        })

    })
})
module.exports = router
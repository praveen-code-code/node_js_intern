const express = require('express');
const mongoose = require('mongoose');
const userData = require('./model');
const bcrypt = require('bcrypt');

const app = express("mongodb+srv://loginsa80_db_user:JahDfkUyWSRqIjTs@cluster0.oo49k08.mongodb.net/");

app.use(express.json());

mongoose.connect( )
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err.message));

app.post("/signup", async (req,res)=>{
    const {username, email , password} = req.body;
    try{
        const existed_user = await userData.findOne({email})
        if(existed_user){
            return res.json({message:"email already reg"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password,salt)

        const user = new userData({username,email, password:hashed_password})
        await user.save()
        return res.json({message:"user registed",
            username : user.username
        })
    }catch(err){
        console.log(err.message)
    }
})



app.post("/login", async (req,res)=>{
    const {email,password}= req.body;
    try{
        const found_user = await userData.findOne({email})
        if(!found_user){
            return res.json({message:"invaild login Data"});
        }
        const ismatch = await bcrypt.compare(password,found_user.password);
        if(!ismatch){
            return res.json({error:"invalid password"})
        }
        return res.json({message:"user login",
            username:found_user.username
        })
    }
    catch(err){
        console.log(err.message)
    }
})











app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
const express = require('express');
const mongoose = require('mongoose');
const userData = require('./model');
const app = express();


mongoose.connect("")
.then(()=>console.log("database conneted"))
.catch((err)=> console.log(err.message))
app.use(express.json())
app.post('/send', async (req, res) => {

    const { username, email, Password } = req.body;
    try {
        const data = new userData({
            username,
            email,
            Password
        });
        await data.save();
        return res.json({"messsage":"Data sent successfully"});
    }
    catch (err) {
        console.log(err.message);
      
    }
});





app.listen(3000, ()=> console.log("server is running...."))
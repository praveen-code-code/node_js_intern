const express = require('express');
const mongoose = require('mongoose');
const userData = require('./model');

const app = express();

app.use(express.json());

mongoose.connect(")
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err.message));

app.post('/send', async (req, res) => {

    const { username, email, Password } = req.body;
    try {
        const data = new userData({
            username,
            email,
            Password
        });

        await data.save();
        return res.json("Data sent successfully");
    }
    catch (err) {
        console.log(err.message);
    }
});

app.get('/get_data', async (req,res)=>{
    try{
        const data = await userData.find()
        return res.json({
            message :"getting data...",
            userdata: data
        })
    }
    catch(err){
        console.log(err.message)
    }
})

app.get('/getData/:id', async (req, res) => {
    try {
        const user = await userData.findById(req.params.id).select("username email");
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
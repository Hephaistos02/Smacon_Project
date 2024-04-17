const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const StudentModel = require('./models/studentsSchema')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

mongoose.connect("mongodb+srv://sahilms750:Sysmii%40123@smacon.ns0frrh.mongodb.net/")

//get data
app.get('/' , (req,res) => {
    StudentModel.find({})
    .then(users => {
        res.json(users)
    })
    .catch(err =>{
         res.json(err)
    })
})

//Upload Data
app.post("/create",(req,res) => {
    StudentModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//delete data
app.delete("/deleteStudent/:id", (req,res) => {
    const id = req.params.id;
    StudentModel.findByIdAndDelete({_id:id})
    .then(result => 
        res.json(result))
    .catch(err => res.json(err))
})

app.get('/checkPhone/:phoneNumber', async (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    try {
        const existingStudent = await StudentModel.findOne({ phone: phoneNumber });
        const phoneNumberExists = !!existingStudent;
        res.json({ exists: phoneNumberExists });
    } catch (error) {
        console.error("Phone Number Already Registered:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(PORT ,()=>{
    console.log(`Server is running on ${PORT}`);
})
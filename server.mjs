import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./DB/Connect.DB.mjs"
import User from "./model/user.mjs"
const app = express()
import cors from "cors"

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())
connectDb(process.env.MONGODB_URI)

app.post("/add", async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const user = await User.create({
            name,
            email,
            password
        })
        res.status(201).send({
            succes: true,
            user
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            error
        })
    }
})

app.delete("/delete/:id", async (req, res, next) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(200).send({
            succes: true,
            message: `Delete by ID : ${req.params.id}`
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            error
        })
    }
})

app.put("/update/:id", async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const { id } = req.params;
        const updateObj = {}
        if (name) {
            updateObj.name = name
        }
        if (email) {
            updateObj.email = email
        }
        if (password) {
            updateObj.password = password
        }
        await User.findOneAndUpdate({ _id: id }, updateObj)
        res.status(200).send({
            succes: true,
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            error: error
        })
    }
})

app.get("/get/:id", async (req, res, next) => {
    try {
        const user = await User.find({ _id: req.params.id })
        res.status(200).send({
            succes: true,
            user
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            error
        })
    }
})

app.get("/get", async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).send({
            succes: true,
            users
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            error
        })
    }
})

app.listen(5001, () => {
    console.log(`Server is Running http://localhost:${5001}`);
})
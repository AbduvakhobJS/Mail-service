const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/mail', require('./controller/gmail'))

const db = async () => {
    try {
        mongoose.connect('mongodb://0.0.0.0:27017/gmail_app')
        .then(() => {
            console.log('Database ishlavotti')
        })
        .catch((e) => {
            console.log(e)
        })
    } catch (error) {
        console.log(error)
    }
}
db()
app.listen(7000, () => {
    console.log("Server is running")
})
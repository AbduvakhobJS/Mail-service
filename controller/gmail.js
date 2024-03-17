const express = require('express')
const router = express()
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const tls = require('tls')
const Katalog = require('../model/katalog')


router.post('/send', async (req, res) => {
    const {mail, text} = req.body
    const tlsOptions = {
        rejectUnauthorized: false
    };
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "developerabduvahob714@gmail.com",
            pass: "xulsokfymjatmjnt"
        },
        tls: tlsOptions
    })

    let mailOptions = {
        from: 'developerabduvahob714@gmail.com',
        to: mail,
        subject: 'Test habar',
        text: text
    }

    transporter.sendMail(mailOptions, (error,info) => {
        if(error){
            console.log('Xatolik', error)
        }
        else {
            res.send('Habar yuborildi')
            console.log('Habar yuborildi:', info.messageId)
            const katalog = new Katalog({
                mail: mail,
                text: text
            })
            katalog.save()
        }
        
    })
})


router.get('/messages', async (req, res) => {
    const messages = await Katalog.find()
    .then((message) => {
        res.json(message)
    })
    .catch((e) => {
        res.json(e)
    })
})


module.exports = router
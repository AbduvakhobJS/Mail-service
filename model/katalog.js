const { Schema, model, mongoose } = require("mongoose");

const Katalog = Schema({
    mail: String,
    text: String
})

module.exports = model('Katalog', Katalog)

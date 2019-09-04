const mongoose = require('mongoose');

const SavingSchema = mongoose.Schema({
    userName: String,
    userId: String,
    amount: Number,
    months: Number,
    date: {
        day: Number,
        month:Number
    }
})

module.exports = mongoose.model('Saving', SavingSchema);

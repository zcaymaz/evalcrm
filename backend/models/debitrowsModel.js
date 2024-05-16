const mongoose = require('mongoose')

const debitrowsSchema = new mongoose.Schema({
    cst: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false,
    },
    debit: {
        type:String,
    },
    credit: {
        type:String,
    },
    material:{
        type: String,
    },
    materialcount:{
        type: number,
    },
    unitprice:{
        type: String,
    },
    isInstalment: {
        type: Boolean,
        default: false
    },
    instalmentcount: {
        type: String,
    },
    instalmentdates: {
        type: String,
    },
    sellbydate: {
        type: String,
    },
    isArchived: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Debit", debitrowsSchema)

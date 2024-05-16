const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    surname: {
        type:String,
        required:true
    },
    companyname: {
        type:String,
        required:true
    },
    tcorvkn:{
        type: String,
    },
    address:{
        type: String,
    },
    description:{
        type: String,
    },
    debitrows:{
        type: Array,
    },
    totaldebit: {
        type: String,
    },
    totalcredit: {
        type: String,
    },
    isArchived: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Customer", customerSchema)

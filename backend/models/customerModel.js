const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    customername: {
        type:String,
        required:true
    },
    customersurname: {
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
    gsmno:{
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
    userid: {
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Customer", customerSchema)

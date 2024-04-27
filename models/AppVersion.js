const mongoose = require("mongoose");
const AppVersionSchema = mongoose.Schema({
    version:{
        type : String,

    },
    show : {
        type : Boolean,
        default:false
    }
});
module.exports = AppVersion = mongoose.model("AppVersion",AppVersionSchema)
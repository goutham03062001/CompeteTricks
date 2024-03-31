const mongoose = require("mongoose");
const AppVersionSchema = mongoose.Schema({
    version:{
        type : String,

    }
});
module.exports = AppVersion = mongoose.model("AppVersion",AppVersionSchema)
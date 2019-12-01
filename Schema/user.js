var userSchema=new mongoose.Schema({
    registrationNo:String,
    name:String,
    pass:String,
    email:String,
    mob:Number
});

module.exports = mongoose.model("user", userSchema);
var express=require('express');
var app=express();
var mongoose=require('mongoose');
var body=require('body-parser');
mongoose.connect("mongodb://localhost/portalDB",{useUnifiedTopology:true,useNewUrlParser:true});
var db=mongoose.connection;
db.once("open",function(){
    console.log("Database Connected!");
});
db.on('error',console.error.bind(console,"Connection Error:"));

app.use(body.urlencoded({extended:true}));

var candidateSchema=new mongoose.Schema({
    
    reg:String,
    name:String,
    pass:String,
    email:String,
    mob:Number,
    branch:String,
    gender:String,
    dob:String
});
var Candidate=new mongoose.model("Candidate",candidateSchema);
// var reg,name,pass,email,mob,branch,gender,dob;
var candidateInfo,loginInfo;
app.get("/",function(req,res){
    res.send("Main Page");
});
app.get('/register',function(req,res){
    res.render('signup.ejs');
});
app.get('/login',function(req,res){
    res.render('login.ejs');
});
app.post('/info',function(req,res){       

    candidateInfo={
        reg:req.body.candReg,
        name:req.body.candName,
        pass:req.body.candPass,
        email:req.body.candEmail,
        mob:req.body.candMob,
        branch:req.body.candBranch,
        gender:req.body.candGender,
        dob:req.body.candDOB
    }
    Candidate.create(candidateInfo,function(err,candInfo){
        if(err)
        {
            console.log("Error has occured and data was not saved!");
            res.redirect('/errorSignUp')
        }
        else
        {
            console.log("Info Added");
            console.log(candInfo);
            res.redirect('/verification');  //Verification of details via email/mobile
        }
    });
   
});
app.get('/errorSignUp',function(req,res){
    res.render('errorPage.ejs');
});
app.post('/loginData',function(req,res){
    loginInfo={
        reg:req.body.regNo,
        pass:req.body.password
    };
    Candidate.find(loginInfo,function(err,response){
        if(err)
        {
            console.log("Error occured in /loginData");
            res.redirect('/login');
        }
        else
        {
            console.log('Login Successful');
            res.redirect('/dashboard');
        }
    });
});
app.get('/verification',function(req,res){
    res.render('verify.ejs')
});
app.get('/dashboard',function(req,res){
    res.render('landing.ejs',{name:candidateInfo.name});
});

app.listen(3000,process.env.ID,function(){
    console.log('Server Started');
});

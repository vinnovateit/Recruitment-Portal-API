var express = require('express');
var app = express();
var mongoose = require('mongoose');
var body = require('body-parser');
const User = require("./Schema/user");

mongoose.connect('mongodb://0.0.0.0:27019/viit-recruitment', { useUnifiedTopology: true, useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to mongo');
    }
});

app.use(body.urlencoded({ extended: true }));

app.post('/signup', function (req, res) {
    userInfo = {
        reg: req.body.registrationNo,
        name: req.body.name,
        pass: req.body.pass,
        email: req.body.email,
        mob: req.body.mob
    }

    User(userInfo).save().then(data => {
        console.log("saved");
        res.send({
            status: "200",
            msg: "User Sucessfully Registered."
        })
    }).catch(err => {
        console.log(err);
        res.send({
            status: "500",
            msg: "User Not Registered!"
        })
    })
});

app.post('/login', function (req, res) {
    loginInfo = {
        reg: req.body.registrationNo,
        pass: req.body.pass
    };
    Candidate.find(loginInfo, function (err, response) {
        if (err) {
            res.send({
                status: "400",
                msg: "Email or password wrong."
            })
        }
        else {
            res.send({
                status: "200",
                msg: "Login Successful."
            })
        }
    });
});

app.post('/getQues', async function (req, res) {
    email = req.body.email
    quesType = req.body.quesType

    loginInfo = {
        reg: req.body.email
    };
    isUserExist = await checkIfUserExists(loginInfo)
    if (!isUserExist)
        rres.send({
            status: "400",
            msg: "Unauthorized Request."
        })

    query = { questionType: quesType }
    Questions.find(query).then((query) => {
        resultArr = []
        randomQuesArr = getRandomArrFromArr(query, 10)
        for (i = 0; i < randomQuesArr.length; i++) {
            resultArr.push({
                question: randomQuesArr.question[i].question,
                option1: randomQuesArr.question[i].option1.option,
                option2: randomQuesArr.question[i].option2.option,
                option3: randomQuesArr.question[i].option3.option,
                option4: randomQuesArr.question[i].option4.option,
                quesId: randomQuesArr.question[i].quesId
            })
        }
        res.send({
            status: "200",
            msg: "Request Completed Sucessfully.",
            questions: resultArr
        })
    }).catch((err) => {
        res.send({
            status: "500",
            msg: "Server Error."
        })
    })
});

//TODO complete /submitAns route
app.post('/submitAns', async function (req, res) {
    email = req.body.email
    quesType = req.body.quesType
    answers = req.body.answers

    loginInfo = {
        reg: req.body.email
    };
    isUserExist = await checkIfUserExists(loginInfo)
    if (!isUserExist)
        rres.send({
            status: "400",
            msg: "Unauthorized Request."
        })

});




app.listen(3000, process.env.ID, function () {
    console.log('Server Started');
});




//TODO move below util functions to new file
function getRandomArrFromArr(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandomArrFromArr: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function checkIfRecordExists(query) {
    User.findOne(query).exec((err, user) => {
        if (user || err) {
            return resolve(true);
        } else {
            return resolve(false);
        }
    })
}
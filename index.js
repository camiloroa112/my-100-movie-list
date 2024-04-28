var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded(
    {
        extended: true
    }));

app.use(session(
{
    secret: 'my-secret-key-123',
    resave: false,
    saveUninitialized: true
}));

mongoose.connect('mongodb://localhost:27017/Database');
let db = mongoose.connection;
db.on('error', ()=> console.log("Database connection error."));
db.once('open', ()=> console.log("Connected to Database."));

app.post("/registration", (req, res)=>
    {
        let email = req.body.email;
        let fullname = req.body.fullname;
        let nickname = req.body.nickname;
        let birthdate = req.body.birthdate;
        let password = req.body.password;

        let data = {
                        "email": email,
                        "fullname": fullname,
                        "nickname": nickname,
                        "birthdate": birthdate,
                        "password": password
                    }
        
        db.collection('users').insertOne(data, (err, collection) => 
        {
            if(err)
            {
                throw err;
            }
            console.log("Record inserted successfully!");
        })
        return res.redirect('login.html')
    })

app.post('/login', (request, response) =>
    {
        try
        {
            const username = request.body.txtEmail;
            const password = request.body.txtPassword;

            db.collection('users').findOne({email: username}, (err, res) =>
            {
                if(res === null)
                {
                    console.log("Information does not match, please create an account first.");
                    response.send("Information does not match, please create an account first.");
                }
                else if(err) throw err;

                if(res.password === password)
                {
                    console.log("Successful login");
                    return response.redirect("movie_input.html")
                }

                else
                {
                    console.log("Incorrect password!");
                    response.send("Incorrect password!");
                }
            })
        }

        catch(error)
        {
            console.log("Either the username or password is incorrect, please try again!")
        }

    })

app.get('/logout', (req, res) => 
{
    req.session.destroy((err) => 
    {
        if(err) 
        {
            console.log("Error destroying session:", err);
        } 
        
        else 
        {
            console.log("User signed out successfully");
        }
        
        res.redirect('movie_menu.html'); 
    });
});

app.get('/', (req, res) => 
{
    res.set(
        {
            "Allow-access-Allow-Origin": "*"
        })
    return res.redirect('movie_menu.html')
}).listen(3000);

console.log("Listening on port 3000");
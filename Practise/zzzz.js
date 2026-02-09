const express = require("express");
const app = express();
const flash = require("connect-flash");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// const ExpressError = require("./utils/ExpressError.js");
// const cookieParser = require("cookie-parser");

const session = require("express-session");

// app.use(cookieParser("asdf"));

const sesssionOptions = {
    secret: "thisisasecretkey",
    resave: false,
    saveUninitialized: true,
}

app.use(session(sesssionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.errorMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    next();
});

app.use("/api", (req, res, next) => {
    let {token} = req.query;
    console.log(token);
    if(token === "abcd"){
        next();
    }
    throw new Error(401,"Unauthorized Access");
});

// app.get("/asd", (req, res) => {
//     res.cookie("username","Adimanus", {signed: true});
//     res.cookie("username","s2", {signed: true});
//     // console.dir(req.cookies);
//     // console.log("hello");
    
//     res.send("Working Well");
// });

app.get("/verify", (req, res) => {   
    // console.log(req.signedCookies);
    res.send("verify");
});

app.get("/verify/user", (req, res) => {   
    // console.log(req.signedCookies);
    res.send("verify 2");
});

app.get("/count", (req, res) => {   
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count = 1;
    }
    
    res.send(`count is ${req.session.count}`);
});

app.get("/asdfg", (req, res) => {   
    let{name="Annonnymous"} = req.query;
    req.session.name = name;
    console.log(req.session.name);
    if(name === "Annonnymous"){
        req.flash("error","Rigistration Failed");
    }
    else{
        req.flash("success","successfully Registered ");
    }
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {   
    // console.log(req.flash("success"));
    
    
    res.render("new.ejs", {name: req.session.name});
});


app.listen(8080, () => {
    console.log("Server Is Ready");
});
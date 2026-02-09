const User = require("../models/userModel");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signupUser = async(req, res, next) => {
    try {
        let {username, email, password} = req.body;
        let newUser = new User({username, email});
        const regUser = await User.register(newUser, password);
        req.login(regUser, err => {
            if(err) {
                return next(err);
            }

            else {
                req.flash("success", "Welcome");
                res.redirect("/listning");
            }
        });
    } catch (e) {
        req.flash("error", e.message);
        console.log(e.message);
        res.redirect("/signup");
    }

};

module.exports.loginRenderForm = (req, res) => {
    res.render("users/login.ejs")
};

module.exports.loginUser =  (req, res) => {
    req.flash("success", "Welcome");
    res.redirect(res.locals.redirecturl || "/listning");
};

module.exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have been logged out.");
        res.redirect("/listning");
    });
};
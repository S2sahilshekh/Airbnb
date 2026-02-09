const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const flash = require("connect-flash");
let { saveRedirectUrl } = require("../middlewere.js");
const userController = require("../controler/user.js");
  
router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signupUser)
);

router.route("/login")
.get(userController.loginRenderForm)
.post( 
    saveRedirectUrl,
    passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}), 
    userController.loginUser
); 


// router.post("/login", 
//     saveRedirectUrl,
//     passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
// }), 
//     userController.loginUser
// ); 

router.get("/logout", userController.logoutUser);

module.exports = router;
const { check, validationResult } = require("express-validator");
const indexModel = require("../models/index.model");
const bcrypt = require("bcrypt");
const notesModel=require('../models/notes.model');
const { json } = require("body-parser");
module.exports.signup = async (req, res) => {
  let users = await indexModel.find({});
  //   console.log((users));
  res.render("signup", {
    pageTitle: "Authentication",
    isLoggedIn:false,
    MessageError: [],
    oldInputs: { name: "", email: "", password: "", confirmPassword: "" },
  });
};

module.exports.handleSignUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    const user = await indexModel.findOne({ email });
    console.log(user);
    if (user) {
      res.render("signup", {
        pageTitle: "SignUp",
        MessageError: [{ param: "exists" }],
        isLoggedIn:false,
        oldInputs: { name, email, password, confirmPassword },
      });
    } else {
      bcrypt.hash(password, 8, function (err, hashPassword) {
        indexModel.insertMany({ name, email, password: hashPassword });
        res.redirect("/signin");
      });
      // const match = await bcrypt.compare(password, user.passwordHash);
    }
  } else {
    res.render("signup", {
      pageTitle: "SignUp",
      isLoggedIn:false,
      MessageError: errors.array(),
      oldInputs: { name, email, password, confirmPassword },
    });
  }
};
module.exports.signin = async (req, res) => {
    res.render("signin", {
        pageTitle: "SignIn",
        isLoggedIn:false,
        MessageError:[],
        oldInputs: {  email:'', password:'' },
      });
};

module.exports.handleSignin = async (req, res) => {
  const { email, password } = req.body;
  const user = await indexModel.findOne({ email });
  if (user) {
      console.log('test');
                const match = await bcrypt.compare(password, user.password);
                if (match) {

                    // res.setHeader('set-cookie','userID='+user._id)
                    req.session.isLoggedIn=true;
                    req.session.userID=user._id;
                    req.session.userName=user.name;

                    res.redirect('/home')
                }else 
                {
                    res.render("signin", {
                        pageTitle: "SignIn",
                        isLoggedIn:false,
                        MessageError:[{param:'incorrect'}],
                        oldInputs: {  email, password },
                    });   
                    
                    }
  }else 
  {
    res.render("signin", {
        pageTitle: "SignIn",
        isLoggedIn:false,
        MessageError:[{param:'notRegisered'}],
        oldInputs: {  email, password },
      });    
    }
  }
module.exports.home = async (req, res) => {
        const notes = await notesModel.find({UserID:req.session.userID});
    const userData=await indexModel.findOne(req.session.userID)
        // res.json(notes)
        res.render("index", { pageTitle:req.session.userName,userData , isLoggedIn: req.session.isLoggedIn,notes });

};

module.exports.logout = (req, res) => {
    req.session.destroy(()=>{
                res.redirect('/signin')
    })
  };
 
module.exports.notfound = (req, res) => {
  res.send("not found 404");
};

// /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/ for name
// /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/  for password


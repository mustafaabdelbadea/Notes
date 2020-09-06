const indexModel = require("../models/index.model");
const notesModel=require('../models/notes.model')
module.exports.editUser=async(req,res)=>{
  const NoteData=await notesModel.findById({_id:req.params.id});
  const userData=await indexModel.findOne(req.session.userID)
    res.render('editUser',{pageTitle:req.session.userName,userData ,isLoggedIn:true,NoteData});
}
module.exports.UpdatedUser=async(req,res)=>{
  const {name,email}=req.body
 await indexModel.findOneAndUpdate({_id:req.session.userID,name,email})
 
         res.redirect('/home');
        }
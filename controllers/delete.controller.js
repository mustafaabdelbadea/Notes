const notesModel=require('../models/notes.model');
module.exports.deleteNote=async(req,res)=>{
    const _id=req.params._id;
    await notesModel.findByIdAndDelete({_id:req.params.id});
    res.redirect('/home');
}
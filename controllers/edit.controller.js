const notesModel=require('../models/notes.model');
const indexModel=require('../models/index.model');

module.exports.editNote=async(req,res)=>{
    const NoteData=await notesModel.findById({_id:req.params.id});
    const userData=await indexModel.findOne(req.session.userID)

    console.log('test')
    console.log(NoteData);
    res.render('editNote',{pageTitle:req.session.userName ,isLoggedIn:true,NoteData,userData});
}

module.exports.UpdatedNote=async(req,res)=>{
  const NoteData=await notesModel.findById({_id:req.params.id});
         await notesModel.findOneAndUpdate({_id:req.params.id},{ 
          title:req.body.title,
           desc:req.body.desc
         })

          res.redirect('/home');
        }

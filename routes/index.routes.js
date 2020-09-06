const indexRouter = require('express').Router()
const indexModel = require('../models/index.model')
const controller=require('../controllers/index.controller')
const validation=require('../controllers/validation.controller')
const isLoggedIn=require('../middleware/auth')
const addNote=require('../controllers/note.controller')
const deleteNote=require('../controllers/delete.controller')
const editNote=require('../controllers/edit.controller')
const editUser=require('../controllers/editUser.controller')
indexRouter.get('/',controller.signup )
indexRouter.get('/signup',controller.signup )
indexRouter.post('/handleSignUp',validation.signupValidation,controller.handleSignUp )
indexRouter.get('/signin',controller.signin )
indexRouter.post('/handleSignin',controller.handleSignin )
indexRouter.get('/home',isLoggedIn,controller.home )
indexRouter.get('/logout',controller.logout )
indexRouter.post('/addNote',addNote.addNote)
indexRouter.get('/deleteNote/:id',deleteNote.deleteNote)
indexRouter.get('/editNote/:id',editNote.editNote)
indexRouter.post('/UpdatedNote/:id',editNote.UpdatedNote)
indexRouter.get('/editUser/:id',editUser.editUser)
indexRouter.post('/UpdatedUser/:id',editUser.UpdatedUser)
indexRouter.get('*',controller.notfound )
module.exports = indexRouter
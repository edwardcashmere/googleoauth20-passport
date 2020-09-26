const router = require('express').Router();
const passport = require('passport');
const {  redirectLogin } = require('../controllers/public.js')
const {  getLogout } = require('../controllers/private.js')


//login route
router.get('/google',passport.authenticate('google',{scope:['profile']}))

//dashboard route
router.get('/google/callback',passport.authenticate('google',{ failureRedirect:'/'}),
 redirectLogin)

 router.get('/logout',getLogout)


module.exports = router;
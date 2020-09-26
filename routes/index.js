const router = require('express').Router();
const { getDashBoard,addStories,postStories,publicStories,editStory,changeStories,deleteStories,getIndivividualStory,getAllUserStories } = require('../controllers/private');
const { getLogin } = require('../controllers/public');
const {  ensureGuest,ensureAuth} = require('../middlewares/auth');


//login route
router.get('/',ensureGuest,getLogin)

//dashboard route
router.get('/dashboard',ensureAuth,getDashBoard)


//get add stories page
router.get('/stories/add',ensureAuth,addStories)

//post stories to db
router.post('/stories',ensureAuth,postStories)

//show all public stories
router.get('/stories',ensureAuth,publicStories)

router.get('/stories/edit/:id',ensureAuth,editStory)

//get single story from db
router.get('/stories/:id',ensureAuth,getIndivividualStory)

//get all user storiesSchema

router.get('/stories/user/:userId',ensureAuth,getAllUserStories)

router.put('/stories/edit/:id',ensureAuth,changeStories)

//delete stories from db
router.delete('/stories/:id',ensureAuth,deleteStories)




module.exports = router;
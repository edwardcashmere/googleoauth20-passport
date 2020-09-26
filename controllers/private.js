const Story = require('../model/stories.js');

// desc dashboard package
// @route GET /dashboard
//public
exports.getDashBoard = async (req, res, next) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render('dashboard', { name: req.user.firstName, stories });
  } catch (error) {
    console.error(`${error.name} : ${error.message}`);
    res.render('errors/500');
  }
};

exports.getLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};

//get form page
exports.addStories = (req, res, next) => {
  res.render('stories/add');
};

//post the stories page
exports.postStories = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(`${error.name} : ${error.message}`);
    res.render('errors/500');
  }
};

exports.publicStories = async (req, res, next) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();
    res.render('stories/publicstories', { stories });
  } catch (error) {
    console.error(`${error.name} : ${error.message}`);
    res.render('errors/500');
  }
};

exports.editStory = async (req, res, next) => {
  const story = await Story.findById(req.params.id).lean();
  if (!story) {
    return res.render('errors/404');
  }
  if (story.user.toString() !== req.user.id.toString()) {
    res.redirect('/stories');
  } else {
    res.render('stories/edit', { story });
  }
};
//post route edit stories
exports.changeStories = async (req, res, next) => {
  try {
    const story = await Story.findOne({ _id: req.params.id }).lean();
    if (!story) {
      return res.render('errors/404');
    }
    if (story.user.toString() !== req.user.id) {
      res.redirect('/stories');
    } else {
      await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.redirect('/dashboard');
    }
  } catch (error) {
    console.error(`${error.name} : ${error.message}`);
    res.render('errors/500');
  }
};
exports.deleteStories = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.render('errors/404');
    }
    if (story.user.toString() !== req.user.id) {
      res.redirect('/stories');
    } else {
      await story.remove()
      res.redirect('/dashboard');
    }
  } catch (error) {
    console.error(`${error.name} : ${error.message}`);
    res.render('errors/500');
  }
};

//get the full story on a page
exports.getIndivividualStory = async (req, res, next) => {
    try {
        const story = await Story.findById(req.params.id).populate('user').lean();
        if (!story) {
            return res.render('errors/404');
          }

            res.render('stories/show',{ story});
          
    } catch (error) {
        console.error(`${error.name} : ${error.message}`);
        res.render('errors/500');
        
    }

}
//gets allstories by a particular user
exports.getAllUserStories = async (req, res, next) => {
    try {
        const stories = await Story.find({user: req.params.userId,status:'public'}).populate('user').lean();
        if (!stories) {
            return res.render('errors/404');
          }

            res.render('stories/publicstories',{stories});
          
    } catch (error) {
        console.error(`${error.name} : ${error.message}`);
        res.render('errors/500');
        
    }

}



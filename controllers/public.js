

//desc login landing page
//@route GET /

exports.getLogin = (req,res,next) => {
    res.render('login',{layout :'login'})
}

exports.redirectLogin =(req,res,next)=>{
    res.redirect('/dashboard')
}
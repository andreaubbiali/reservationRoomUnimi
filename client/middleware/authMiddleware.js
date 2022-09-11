
exports.checkLogin = async (req, res, next) => {

    if (!req.session.user){
        return res.redirect('login');
    }
    
    return next();
}
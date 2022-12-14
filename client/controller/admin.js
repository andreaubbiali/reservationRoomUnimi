const {checkUserIsLogged} = require('../utils/axiosInstance');

let {basicModel:jsonOutput} = require('../model/model');

exports.adminConsole = async (req, res) => {
    jsonOutput.isAdmin = req.session.user.isAdmin;
    jsonOutput.error = null;

    checkUserIsLogged(req, res);

    return res.render('admin', jsonOutput);
}

exports.showErrorAdminConsole = async (req, res, err) => {
    jsonOutput.isAdmin = req.session.user.isAdmin;
    jsonOutput.error = err;

    return res.render('admin', jsonOutput);
}
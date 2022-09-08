const {checkUserIsLogged} = require('../utils/axiosInstance');

let jsonOutput = {
    'isAdmin': false,
    'error': null
}

exports.adminConsole = async (req, res) => {
    jsonOutput.isAdmin = req.session.user.isAdmin;

    checkUserIsLogged(req, res);

    return res.render('admin', jsonOutput);
}

exports.showErrorAdminConsole = async (res, err) => {
    jsonOutput.isAdmin = req.session.user.isAdmin;
    jsonOutput.error = err;

    return res.render('admin', jsonOutput);
}
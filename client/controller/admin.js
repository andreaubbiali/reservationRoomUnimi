const {checkUserIsLogged} = require('../utils/axiosInstance');

let jsonOutput = {
    'error': null
}

exports.adminConsole = async (req, res) => {

    checkUserIsLogged(req, res);

    return res.render('admin', jsonOutput);
}

exports.showErrorAdminConsole = async (res, err) => {
    jsonOutput.error = err;

    return res.render('admin', jsonOutput);
}
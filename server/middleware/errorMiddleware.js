
function returnError(err, req, res, next) {
    console.log(err);
    res.status(err.statusCode || 500).send(err.message);
    res.end();
}

module.exports = {
    returnError
}
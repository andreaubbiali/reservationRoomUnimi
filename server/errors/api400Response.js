const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./baseError')

class Api400Error extends BaseError {
    constructor(
        description = 'Bad request.',
        statusCode = httpStatusCodes.BAD_REQUEST        
    ) {
        super(description, statusCode)
    }
}

module.exports = Api400Error;
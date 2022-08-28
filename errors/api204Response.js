const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./baseError')

class Api204Error extends BaseError {
    constructor(
        description = 'No content.',
        statusCode = httpStatusCodes.NO_CONTENT        
    ) {
        super(description, statusCode)
    }
}

module.exports = Api204Error;
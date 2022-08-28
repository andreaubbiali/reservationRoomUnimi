const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./baseError')

class Api200Error extends BaseError {
    constructor(
        description = 'Ok.',
        statusCode = httpStatusCodes.OK        
    ) {
        super(description, statusCode)
    }
}

module.exports = Api200Error;
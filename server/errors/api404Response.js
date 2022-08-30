const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./baseError')

class Api404Error extends BaseError {
    constructor(
        description = 'Not found.',
        statusCode = httpStatusCodes.BAD_REQUEST        
    ) {
        super(description, statusCode)
    }
}

module.exports = Api404Error;
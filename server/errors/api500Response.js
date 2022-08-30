const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./baseError')

class Api500Error extends BaseError {
    constructor(
        description = 'Internal server error.',
        statusCode = httpStatusCodes.INTERNAL_SERVER        
    ) {
        super(description, statusCode)
    }
}

module.exports = Api500Error;
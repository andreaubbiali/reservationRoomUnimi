const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./baseError')

class Api401Error extends BaseError {
    constructor(
        description = 'Not authorized.',
        statusCode = httpStatusCodes.NOT_AUTHORIZED        
    ) {
        super(description, statusCode)
    }
}

module.exports = Api401Error;
const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./baseError')

class Api409Error extends BaseError {
    constructor(
        description = 'User Already Exist. Please Login.',
        statusCode = httpStatusCodes.USER_EXIST        
    ) {
        super(description, statusCode)
    }
}

module.exports = Api409Error;
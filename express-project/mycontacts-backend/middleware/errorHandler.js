const {constants} = require("../constants");
const errorHandler = (err, request, response, next) => {
    const statusCode = response.statusCode ? response.statusCode : 500;
    switch (statusCode){
        case constants.VALIDATION_ERROR:
            response.json({title: "Validation Failed", message: err.message, stacktrace: err.stack});
        case constants.UNAUTHORIZED:
            response.json({title: "Unauthorized Access", message: err.message, stacktrace: err.stack});
        case constants.FORBIDDEN:
            response.json({title: "Forbidden", message: err.message, stacktrace: err.stack});
        case constants.NOT_FOUND:
            response.json({title: "Not Found", message: err.message, stacktrace: err.stack});
        case constants.SERVER_ERROR:
            response.json({title: "Server Error", message: err.message, stacktrace: err.stack});
        default:
            console.log("No error, all good!"); 
    }
};

module.exports = errorHandler;
const handleMongooseError = (error, next) => {
    error.status = 400;
    next();
  };
  
  module.exports = handleMongooseError;
const Account = require('./accounts-model');


function handleError(err, req, res, next) { //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    prodMessage: 'The project information could not be retrieved',
    stack: err.stack,
  });
}

// checkAccountPayload = (req, res, next) => {
//   // DO YOUR MAGIC
// }

// checkAccountNameUnique = (req, res, next) => {
//   // DO YOUR MAGIC
// }

// checkAccountId = (req, res, next) => {
//   // DO YOUR MAGIC
// }

module.exports = {
  handleError,
  // checkAccountId,
  // checkAccountNameUnique,
  // checkAccountPayload,
}
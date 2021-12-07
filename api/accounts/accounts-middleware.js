const db = require('../../data/db-config');
const Account = require('./accounts-model');
const yup = require('yup');


function handleError(err, req, res, next) { //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  });
}

const accountSchema = yup.object().shape({
  name:yup
    .string()
    .typeError('name of account must be a string')
    .trim('whitespace alone does not count')
    .required('name and budget are required')
    .min(3, 'name of account must be between 3 and 100')
    .max(100, 'name of account must be between 3 and 100'),
  budget:yup
    .number()
    .typeError('budget of account must be a number')
    .min(0, 'budget of account is too large or too small')
    .max(1000000, 'budget of account is too large or too small')
    .typeError('name needs to be a string')
    .required('name and budget are required'),
})

// function checkAccountPayload(req, res, next) {
//   const error = { status:400 }
//   const { name, budget } = req.body
//   if (name === undefined || budget === undefined) {
//     error.message = 'name and budget are required'
//   } else if (typeof name !== 'string') {
//     error.message = 'name of account must be a string'
//   } else if (name.trim().length < 3 || name.trim().length > 100) {
//     error.message = 'name of account must be between 3 and 100'
//   } else if (typeof budget !== 'number' || isNaN(budget)) {
//     error.message = 'budget of account must be a number'
//   } else if (budget < 0 || budget > 1000000) {
//     error.message = 'budget of account is too large or too small'
//   }
//   if (error.message) {
//     next(error)
//   } else {
//     next()
//   }
// }

async function checkAccountPayload(req, res, next) {
  try {
    const validated = await accountSchema.validate(
      req.body,
      { strict: false, stripUnknown: true }
    )
    req.body = validated
    next();
  } catch (err) {
    next({ message: err.message, status: 400});
  }
}

async function checkAccountNameUnique (req, res, next) {
  try {
    const accountExist = await db('accounts')
    .where('name', req.body.name.trim())
    .first()
    if (accountExist) {
      next({ status:400, message: 'that name is taken'})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}


async function checkAccountId(req, res, next) {
  try {
    const { id } = req.params;
    const account = await Account.getById(id)
    if(account){
      req.account = account 
      next();
    } else {
      next({ status:404, message: 'account not found'});
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  handleError,
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
}
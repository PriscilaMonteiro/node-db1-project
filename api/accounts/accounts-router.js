const router = require('express').Router();

const {
  handleError, 
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require('./accounts-middleware');

const Accounts = require('./accounts-model');


router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(next);
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // try {
  //   const account = await Accounts.getById(req.params.id)
  //   res.json(account)
  // } catch (err) {
  //   next(err)
  // }
  res.status(200).json(req.account);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then(newAccount => {
      res.status(201).json(newAccount);
    })
    .catch(next);
})

router.put(
  '/:id', 
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique, 
  (req, res, next) => {
    Accounts.updateById(req.params.id, req.body)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(next);
})

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(() =>{
      res.status(200).json({});
    })
    .catch(next);
})


router.use(handleError);

module.exports = router;

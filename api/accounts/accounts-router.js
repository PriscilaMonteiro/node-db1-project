const router = require('express').Router();

const {
  handleError,
  // checkAccountId,
  // checkAccountNameUnique,
  // checkAccountId,
} = require('./accounts-middleware');

const Accounts = require('./accounts-model');


router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})


router.use(handleError);

module.exports = router;

const db = require('../../data/db-config');

async function getAll () {
  const rows = await db('accounts')
    .select('id', 'name', 'budget')
    .orderBy('id')
  return rows
}

const getById = id => {
  // DO YOUR MAGIC
}

const create = account => {
  // DO YOUR MAGIC
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

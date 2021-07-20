const { addBook } = require('../handlers/books.handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
];

module.exports = routes;

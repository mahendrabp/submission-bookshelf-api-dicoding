const { addBook, getBooks, getBookById } = require('../handlers/books.handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },

  {
    method: 'GET',
    path: '/books',
    handler: getBooks,
  },

  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById,
  },
];

module.exports = routes;

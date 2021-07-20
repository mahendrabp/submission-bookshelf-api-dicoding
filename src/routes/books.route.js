const { addBook, getBooks, getBookById, editBookById } = require('../handlers/books.handler');

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

  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookById,
  },
];

module.exports = routes;

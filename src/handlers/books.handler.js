const { nanoid } = require('nanoid');
const { books } = require('../models/books');
const response = require('../utils/response.util');

const addBook = (request, h) => {
  try {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
      return response({ h, message: 'Gagal menambahkan buku. Mohon isi nama buku', statusCode: 400, status: 'fail' });
    }

    if (readPage > pageCount) {
      return response({
        h,
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        statusCode: 400,
        status: 'fail',
      });
    }

    const id = nanoid(32);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt; // updatedAt is same with insertedAt
    const finished = pageCount === readPage; //bool
    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      return response({
        h,
        message: 'Buku berhasil ditambahkan',
        statusCode: 201,
        status: 'success',
        data: { bookId: id },
      });
    }
  } catch (error) {
    return response({ h, message: 'Buku gagal ditambahkan', statusCode: 500, status: 'error' });
  }
};

module.exports = { addBook };

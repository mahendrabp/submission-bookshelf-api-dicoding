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

const getBooks = (request, h) => {
  let dataBooks = books;

  return response({
    h,
    message: 'Buku berhasil ditampilkan',
    statusCode: 200,
    status: 'success',
    data: {
      books: dataBooks.map((dataBook) => ({
        id: dataBook.id,
        name: dataBook.name,
        publisher: dataBook.publisher,
      })),
    },
  });
};

const getBookById = (request, h) => {
  const { id } = request.params;
  const filterBookId = books.filter((book) => book.id === id);

  if (filterBookId.length > 0) {
    return response({
      h,
      message: 'Buku ditemukan',
      statusCode: 200,
      status: 'success',
      data: {
        book: filterBookId,
      },
    });
  }

  return response({
    h,
    message: 'Buku tidak ditemukan',
    statusCode: 404,
    status: 'fail',
  });
};

const editBookById = (request, h) => {
  const { id } = request.params; //get id params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id); // if it returns -1, indicating that no element

  if (index !== -1) {
    if (!name) {
      return response({ h, message: 'Gagal memperbarui buku. Mohon isi nama buku', statusCode: 400, status: 'fail' });
    }

    if (readPage > pageCount) {
      return response({
        h,
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        statusCode: 400,
        status: 'fail',
      });
    }

    const finished = pageCount === readPage;

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    return response({
      h,
      message: 'Buku berhasil diperbarui',
      statusCode: 200,
      status: 'success',
    });
  }

  return response({
    h,
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
    statusCode: 404,
    status: 'fail',
  });
};

const deleteBookById = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);

    return response({
      h,
      message: 'Buku berhasil dihapus',
      statusCode: 200,
      status: 'success',
    });
  }

  return response({
    h,
    message: 'Buku gagal dihapus. Id tidak ditemukan',
    statusCode: 404,
    status: 'fail',
  });
};

module.exports = { addBook, getBooks, getBookById, editBookById, deleteBookById };

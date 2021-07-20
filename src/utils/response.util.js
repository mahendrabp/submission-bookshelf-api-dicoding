const response = ({ h, status = 'success', statusCode, message, data }) => {
  if (data) {
    const res = h.response({
      status,
      message,
      data,
    });
    res.code(statusCode);
    return res;
  } else {
    const res = h.response({
      status,
      message,
    });
    res.code(statusCode);
    return res;
  }
};

module.exports = response;

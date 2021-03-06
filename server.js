const Hapi = require('@hapi/hapi');
const routes = require('./src/routes/books.route');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);
  server.events.on('response', function (request) {
    console.log(
      request.info.remoteAddress +
        ': ' +
        request.method.toUpperCase() +
        ' ' +
        request.path +
        ' --> ' +
        request.response.statusCode
    );
  });

  await server.start();
  console.log(`Server started on port ${server.info.uri} 🚀`);
};

init();

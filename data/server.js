// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const path = require('path');
const jsonServer = require('json-server');
const authentication = require('json-server-auth');

const dbPath = path.resolve(__dirname, 'db.json');

const server = jsonServer.create();
const router = jsonServer.router(dbPath);

const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);

server.use(authentication);

server.use(router);

server.listen(3000, () => {
  console.log('json server is up and running!')
});
// require('dotenv').config();
// //Database Connection
// require('./configs/dbConn');

const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`server connected :  http://localhost:${process.env.PORT}`);
});

// server.listen(8080, () => {
//   console.log("server connected");
// });

import http from "http";

import app from "./app";

const server = http.createServer(app);

const onListening = () =>
  console.log(`Application listening on port: ${process.env.PORT}`);

server.on("listening", onListening);

server.listen(process.env.PORT);

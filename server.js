const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, "public");

const server = http.createServer((request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
    return;
  }

  if (request.url !== "/" && request.url !== "/index.html") {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not found");
    return;
  }

  const indexFile = path.join(publicDirectory, "index.html");
  fs.readFile(indexFile, (error, content) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Unable to load the application.");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(content);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Node app is running on http://0.0.0.0:${port}`);
});

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});

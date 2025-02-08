import http from "http";
import fs, { readFile, readFileSync, readSync } from "fs";



const PORT = 5500;
const hostname = "localhost";
const home = fs.readFileSync("./index.html", "utf-8");

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    return res.end(home);
  }
  
  res.end("<h1> hello world </h1>");
});

server.listen(5500, "localhost", () => {
  console.log(`Server is running on http://${hostname}:${PORT}`);
  
})
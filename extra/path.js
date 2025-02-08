import path from "path";

const a = path.extname("/backend/path.js");
console.log(a);

const b = path.basename("C:/Users/Shubham/Desktop/Backend");

console.log(b);

const c = path.dirname("C:/Users/Shubham/Desktop/Backend");

console.log(c);

const d = "/shubham/hello";
const e = path.join("C:/Users/Shubham/Desktop/Backend" + d
);
console.log(e);





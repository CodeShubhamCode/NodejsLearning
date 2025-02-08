// // server banana hai
// //const http = require("http");
// import http from "http"; // upar wale ko ham iss format main likh sakte hai kyuki hamne dependecies main type ko module kar dia hai


// // const gfName = require("./feature");
// // import gfName, { gfName2,gfName4 } from "./feature.js";
// // // import { } from "./feature.js";
// // import { gfName3 } from "./feature.js";

// import * as myobj from "./feature.js";

// // export default main ham kisi bhi naam se import kar sakte hai


// // console.log(gfName);
// // console.log(gfName2);
// // console.log(gfName3);
// // console.log(gfName4);

// console.log(myobj.gfName2);

// // function module ko import karke use krana

// import { generatelovepercent } from './function.js';
// // yahan curly braces isliye lagaye hai kyuki ye named export hai default export nhi hai
// // default export hota tho nhi lagane padta

// console.log(generatelovepercent());

// import a from './function.js';

// a.average(12, 10);
// a.percent(32, 10);

// // file system
// import fs from "fs";

// // fs.readFile("./sample.txt", "utf-8",(err, data) => {
// //   if (err) {
// //     return err;
// //   }
// //   console.log(data);
  
// // });

// // read file is an asynchronous function

// const abb = fs.readFileSync("./sample.txt", "utf-8")
// console.log(abb);

// const temp = "This is a new edit by shubham";
// fs.writeFile("./sample2.txt", temp, () => {
//   console.log("written");
// });

// const temp2="hello bhai kya haal hai sab badhiya hai na sab changa si"
// fs.writeFileSync("./sample2.txt", temp2);

// console.log("i am first");



// const server=http.createServer((req,res) => {
//   if (req.url === "/about") {
//     res.end("<h1>About Page</h1>");
//   }
//   else if (req.url === "/") {
//     res.end("<h1>Home Page</h1>");
//   }
//   else if (req.url === "/contact") {
//     res.end("<h1>Contact Page</h1>");
//   }
//   else {
//     res.end("<h1>Page Not Found</h1>");
//   }

// });

// server.listen(5000, () => {
//   console.log("server is working");
// });


/**********************************************************************************************/

//

/*********************************************************************************************************************************************************************************************************************************************************************************************** */



// PRoject 1
// import express from "express";
// import path from "path";
// import mongoose from "mongoose";


// mongoose.connect("mongodb://127.0.0.1:27017", {
//   dbName: "Backend",
//   // yaha pe koi bhi naam de sakte hai
// })
//   .then(() => console.log("Database connected"))
//   .catch((e) => console.log(e))

// const messageSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });

// const Message=mongoose.model("Message",messageSchema)

  
// const app = express();

// const users = [];



// // using middlewares
// app.use(express.static(path.join(path.resolve(), "public")));

// app.use(express.urlencoded({ extended: true }));
// // console.log(path.join(path.resolve(), "public"));

// // setting up viewengine
// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("index");
// })

// app.post("/contact", async(req, res) => {
//   // console.log(req.body.name);

//   // const messageData = { user };

//   // await Message.create({
//   //   name: req.body.name,
//   //   email: req.body.email
//   // })

//   const { name, email } = req.body;
//   // await Message.create({
//   //   name: name,
//   //   email: email
//   // })
//   await Message.create({
//     name,
//     email
//   })
  
//   // console.log(messageData);
  

//   // res.render("success");
//   res.redirect("/success");
  
// })

// app.get("/users", (req, res) => {
//   res.json({
//     users,
//   });
// });


// app.get("/add", async(req, res) => {
//   await Message.create({
//     name: "shubham",
//     email:"shubham@gmail.com"
//   })
//   res.send("nice");
//   //   .then(() => {
//   //   console.log("Added Successfully");
//   // }).catch((e) => {
//   //   console.log(e);
//   // })
// });

// app.get("/success", (req, res) => {
//   res.render("success");
// })
// app.listen(5000, () => {
//   console.log("SERVER is working");
// })






/************************************************************************************************************************************************************************************************************************************************************************************ */



// Authentication 
import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


mongoose.connect("mongodb://127.0.0.1:27017", {
  dbName: "Backend",
  // yaha pe koi bhi naam de sakte hai
})
  .then(() => console.log("Database connected"))
  .catch((e) => console.log(e))

// const messageSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });

// const Message=mongoose.model("Message",messageSchema)

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

  
const app = express();



// using middlewares
app.use(express.static(path.join(path.resolve(), "public")));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.set("view engine", "ejs");

const isAuthenticated = async(req, res,next) => {
  const token = req.cookies.token;

  if (token) {
    const decoded = jwt.verify(token, "shushushushu");
    
    // console.log(decoded);

    req.loggedInUser = await User.findById(decoded._id);
    
    next();
  }
  else {
    res.redirect("/login");    
  }  
}

app.get("/", isAuthenticated, (req, res) => {
  // console.log(req.loggedInUser);
  
  res.render("logout",{name:req.loggedInUser.name});
})

app.get("/register", (req, res) => {
  res.render("register")
})

// yahan pe (req,res) handlers hai aur aise multiple handlers ho sakte hai jo ek k baad ek render honge aur next se ye hota hai ki current wala hanler skip hoke aage wala handler call ho jaaegaa

// equivalent code neeche hai
// app.get("/", (req, res,next) => {
//   const token = req.cookies.token;

//   if (token) {
//     next();
//   }
//   else {
//     res.render("login");    
//   }  
// },(req, res) => {
// })

app.post("/register", async(req, res) => {

  // console.log(req.body);
  const { name, email,password } = req.body;

  const userloggedIn = await User.findOne({ email });
  
  // console.log(userloggedIn);
  
  if (userloggedIn) {
    return res.redirect("/login");    
  }

  const hashPassword = await bcrypt.hash(password, 10);

  console.log(hashPassword);
  

  const user = await User.create({
    name,
    email,
    password:hashPassword,
  })
  
  // console.log(user);
  // console.log(user._id);
  
  const token = jwt.sign({ _id: user._id }, "shushushushu");

  // console.log(token);
  
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000)
  });
  res.redirect("/");
})

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now())
  });
  res.redirect("/");
})

app.get("/login", (req, res) => {
  res.render("login");
})

app.post("/login", async (req, res) => {
  
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return res.redirect("/register");

  // const isMatch = user.password === password;
  const isMatch = await bcrypt.compare(password,user.password);

  if (!isMatch) return res.render("login", { email,message: "Incorrect Password!!!" });
  
  const token = jwt.sign({ _id: user._id }, "shushushushu");

  // console.log(token);
  
  
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000)
  });
  res.redirect("/");
})





app.listen(5000, () => {
  console.log("SERVER is working");  
})

// Bcrypt ka kaam hai ki hamare database main password save ho rha hai and ham freely password dekh sakte hai which is not a good thing isliye ham bcrypt use karenge
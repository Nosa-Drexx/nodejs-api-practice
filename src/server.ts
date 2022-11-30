import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev")); //logs out incoming request.
app.use(express.json()); //allows a client to send json, (without this you will have to put together the chunks of the json elements yourself.)
app.use(express.urlencoded({ extended: true })); // allows client to add things like a query, and parameters it decodes and encodes it properly(without this it will take it all as an string).

// app.use((req, res, next) => {
//   req._secret = "doggy";

//   next();
// }); //personal middleware

app.get("/", (req, res, next) => {
  setTimeout(() => {
    next(new Error("hello")); //async error handling in express.
  }, 1);
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);

app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401);
    res.json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400);
    res.json({ message: "invalid input" });
  } else {
    res.status(500);
    res.json({ message: "That's on us" });
  }
}); // error handlers has a to be at the bottom of all your route so that express can bubble your error up to it.

export default app;

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

app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);

app.post("/signin", signin);

export default app;

import app from "./server";
import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`hello on http://localhost:${PORT}`);
});

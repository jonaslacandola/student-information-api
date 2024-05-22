import { createServer } from "node:http";
import app from "./app.js";

const server = createServer(app);

server.listen(process.env.PORT || 8000);

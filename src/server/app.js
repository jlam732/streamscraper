const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const app = express();

app.use(morgan("common"));
app.use(helmet());
// app.use(
//   cors({
//     // origin: ["http://localhost:3001"],
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"]
//   })
// );
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", require("./routes"));

app.listen(3002, () => console.log("Node server running at port 3002"));

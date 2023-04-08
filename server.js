const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const adminRouter = require("./routes/admin");
const studentRouter = require("./routes/student");
const teacherRouter = require("./routes/teacher");

app.use("/admin", adminRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connecton extablished successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

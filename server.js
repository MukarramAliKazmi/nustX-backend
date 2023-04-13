const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const courseRouter = require("./routes/course");
const disciplineRouter = require("./routes/discipline");
const enrollmentRouter = require("./routes/enrollment");
const studentRouter = require("./routes/student");
const teacherRouter = require("./routes/teacher");

app.use("/courses", courseRouter);
app.use("/disciplines", disciplineRouter);
app.use("/enrollments", enrollmentRouter);
app.use("/students", studentRouter);
app.use("/teachers", teacherRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connecton extablished successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

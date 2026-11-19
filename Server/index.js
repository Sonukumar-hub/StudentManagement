const  express =  require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db.js");
const studentRoutes = require("./routes/studentRoutes.js");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("Student Management API");
});


app.listen(3000, () => {
  console.log(`Server Running on Port ${3000}`);
});
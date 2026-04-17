const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDb } = require("./config/db");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB
connectDb();

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));
app.use("/api/saved", require("./routes/savedRoutes"));


const port = process.env.PORT || 3005;

app.listen(port, () => {
    console.log(` Server running on port ${port}`);
});
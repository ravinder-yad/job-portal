const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const { connectDb } = require("./config/db");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"], // Support both standard Vite ports
    methods: ["GET", "POST"]
  }
});

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// DB
connectDb();

// Socket.io Logic
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));
app.use("/api/saved", require("./routes/savedRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/settings", require("./routes/settingRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

const port = process.env.PORT || 3005;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
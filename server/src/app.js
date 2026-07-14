const express = require("express");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");
const transactionRoutes = require("./routes/transaction.routes");
const adminRoutes = require("./routes/admin.routes");
const errorHandler = require("./errors/errorHandler");
const helmetMiddleware = require("./security/helmet");
const corsMiddleware = require("./security/cors");
const rateLimitMiddleware = require("./security/ratelimiter");
const dashboardRoutes = require("./routes/dashboard.routes");
const notificationRoutes = require("./routes/notification.routes");
const healthRoutes = require("./routes/health.routes");
const app = express();

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(morgan("dev"));
app.use(express.json());

// Health checks stay outside the global rate limit.
app.use("/api/v1/health", healthRoutes);

app.use(rateLimitMiddleware);

app.use("/uploads", express.static("src/uploads"));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/notification", notificationRoutes);
app.get("/", (req, res) => {
  res.send("Banking Management System API is Running...");
});
app.use(errorHandler);
module.exports = app;
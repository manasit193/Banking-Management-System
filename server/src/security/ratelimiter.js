const rateLimit = require("express-rate-limit");

// General API traffic — SPA pages hit many endpoints per session.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    const path = req.path || "";
    return path === "/api/v1/health" || path.startsWith("/api/v1/health/");
  },
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

// Stricter limit for auth endpoints (brute-force protection).
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many auth attempts, please try again later.",
  },
});

module.exports = limiter;
module.exports.authLimiter = authLimiter;

const mongoose = require("mongoose");

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log("❌ MongoDB Connection Failed");
    console.log("MONGODB_URI is not defined in environment variables");
    process.exit(1);
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
      });

      console.log("✅ MongoDB Connected Successfully");
      return;
    } catch (error) {
      const isLastAttempt = attempt === MAX_RETRIES;

      console.log(
        `❌ MongoDB Connection Failed (attempt ${attempt}/${MAX_RETRIES})`
      );
      console.log(error.message);

      if (isLastAttempt) {
        process.exit(1);
      }

      await sleep(RETRY_DELAY_MS * attempt);
    }
  }
};

module.exports = connectDB;

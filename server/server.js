require("dotenv").config();
require("./src/config/cloudinary");
const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();
const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
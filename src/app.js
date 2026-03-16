require("dotenv").config();
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use(logger);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

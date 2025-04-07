const express = require("express");
const cors = require("cors");
const authRoutes = require("./interfaces/routes/authRoutes");
const profileRoutes = require("./interfaces/routes/profileRoutes");
const reviewRoutes = require("./interfaces/routes/reviewRoutes");
const commentRoutes = require("./interfaces/routes/commentRoutes");
const postRoutes = require("./interfaces/routes/postRoutes");
const followRoutes = require("./interfaces/routes/followRoutes");
const likeRoutes = require("./interfaces/routes/likeRoutes");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/review", reviewRoutes);
app.use("/comment", commentRoutes);
app.use("/post", postRoutes);
app.use("/follow", followRoutes);
app.use("/like", likeRoutes);

module.exports = app;

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./Database');
const bodyParser = require('body-parser');

const app = express();

app.use('/uploads', express.static('uploads'));

connectDB();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: 'https://p2-8s8q3kg16-bhavyas-projects-d0640363.vercel.app', // Your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Product routes
const productRoutes = require("./Route");
app.use("/api/admin", productRoutes);

// User routes
const userRoutes = require("./Route");
app.use("/api/user", userRoutes);

// Add to cart routes
const addToCartRoutes = require("./Route");
app.use("/api/cart", addToCartRoutes);

// Category routes
const categoryRoutes = require("./Route");
app.use("/api/category", categoryRoutes);

app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { Createproduct, Viewproduct, viewsingleproduct, removeproduct, updateproduct, imageview, download } = require('./controller/productcontroller');
const { registerpost, registerget, signup, loginuser } = require('./controller/Usercontroller');
const { Viewadmin, adminLogin, adminregisteration } = require('./controller/Admincontroller');
const { Addcategory, Viewcategory, viewsinglecategory, removecategory, updatecategory } = require('./controller/Categorycontroller');
const { addCart, Viewcart, removecart, deleteCart } = require('./controller/Addtocartcontroller');

const router = express.Router();
const app = express();

const imageDirectory = path.join(__dirname, './uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(cors({
    origin: 'https://p2-8s8q3kg16-bhavyas-projects-d0640363.vercel.app', // Your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'uploads')));

app.post('/Addproduct', upload.single('image'), Createproduct);
app.get('/Viewimage/:fileName', imageview);
app.get('/download', download);

app.get('/Viewproduct', Viewproduct);
app.get('/viewsingleproduct/:id', viewsingleproduct);
app.get('/deleteproduct/:id', removeproduct);
app.post('/updateproduct', updateproduct);

// Admin routes
app.post('/adminlogin', adminLogin);
app.post('/registrationadmin', adminregisteration);
app.get('/Viewadmin', Viewadmin);

// User routes
app.post('/userreg', registerpost);
app.get('/userget', registerget);
app.post('/logins', signup);
app.post('/login', loginuser);

// Add to cart routes
app.post('/Addcart', addCart);
app.post('/deletecart', deleteCart);
app.get('/Viewcart', Viewcart);
app.get('/removecart/:id', removecart);

// Category routes
app.post('/Addcategory', Addcategory);
app.get('/Viewcategory', Viewcategory);
app.get('/viewsinglecategory/:id', viewsinglecategory);
app.get('/deletecategory/:id', removecategory);
app.post('/updatecategory', updatecategory);

module.exports = app;

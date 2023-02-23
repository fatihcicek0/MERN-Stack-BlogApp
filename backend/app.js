const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
app.use(bodyParser.json());
app.use(multer({ storage: storage }).single('img'));
const userRoutes = require('./routers/user');
const postRoutes = require('./routers/post');
app.use(userRoutes);
app.use(postRoutes);
app.use('/public', express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ahmetveli:ahmetveli@cluster0.a7ff9o2.mongodb.net/blog-app?retryWrites=true&w=majority')
  .then(() => {
    console.log('connected to mongodb');
    app.listen(8080, () => {
      console.log('8080');
    });
  }).catch(err => { console.log(err) });       
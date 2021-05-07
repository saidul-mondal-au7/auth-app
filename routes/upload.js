let express = require('express');
let multer = require('multer');
let mongoose = require('mongoose');
let { v4: uuidv4 } = require('uuid');
let router2 = express.Router();
 
// User model
let User = require('../models/jsonUp');
 
const DIR = '../public'
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
 
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(json|doc|docx|jpg)$/)) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .json, .doc and .docx format allowed!'));
        }
    }
});
 
router2.post('/upload', upload.single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: url + '/public/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
        message: "User registered successfully!",
        userCreated: {
        _id: result._id,
        image: result.image
        }
    })
}).catch(err => {
    console.log(err),
    res.status(500).json({
        error: err
        });
    })
})
 
module.exports = router2;
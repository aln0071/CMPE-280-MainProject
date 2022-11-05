const express = require('express');
const async = require("async");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile, getFileStream } = require('./s3');
const { getConnection } = require('./dbconnect');
const blogModel = require("./models/blogPost.js");
const commentModel = require("./models/comments.js");
const userModel = require("./models/user.js");


const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());

const port = 3001;

getConnection()
    .then(connection => {
        console.log(connection);
    }).catch(error => {
        console.log(error);
    })

app.get("/", (req, res) => {
    res.json({
        response: "success"
    })
})

// get image
app.get('/image/:key', (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
})

// upload image
app.post('/image', upload.single('image'), async (req, res, next) => {
    const file = req.file;
    const result = await uploadFile(file);
    await unlinkFile(file.path)
    // const description = req.body.description;
    res.json(result);
})


app.get('/getAllBlogs', async (req, res) => {
    // create Request object   
    // query to the database and get the records
    const allBlogs= await blogModel.find().then( userResponse => {
        res.status( 200 ).json( userResponse )
      })
      .catch( error => {
        res.status( 400 ).send( error )
      });
    });

app.get('/getBlog/:id', async (req, res) =>{
    const blogNum = req.params.id;
    const query = { _id: blogNum };
    const blog=  await blogModel.findById(query).then( userResponse => {
        res.status( 200 ).json( userResponse )
      })
      .catch( error => {
        res.status( 400 ).send( error )
      }) 
    });

app.post('/createBlog', async (req, res) => {
    const { topic, description, author,annonymusFlag,tags,comments } =req.body;
    const query = {
        topic,
        description,
        author,
        annonymusFlag,
        tags,
        comments
    };
    
    const blog = new blogModel(query);
    let result = await blog.save().then(blog => {
        res.status( 200 ).json( blog )
      })
      .catch( error => {
        res.status( 400 ).send( error )
      }) 

  });

app.listen(port, () => console.log("[backend] listening on port " + port));


require('dotenv').config();
const express = require('express');
const async = require("async");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const jwt = require("jsonwebtoken");
const tokenKey = process.env.TOKEN_KEY || 'cmpe280_jwt_token_key';
const bcrypt = require("bcryptjs");


const { uploadFile, getFileStream } = require('./s3');
const { getConnection } = require('./dbconnect');
const blogModel = require("./models/blogPost.js");
const commentModel = require("./models/comments.js");
const userModel = require("./models/user.js");


const app = express();
var cors = require("cors");
const { authMiddleware } = require('./authMiddleware');
const blogPostModel = require('./models/blogPost.js');
app.use(cors());
app.use(express.json());

const port = 3001;

getConnection()
  .then(connection => {
    // console.log(connection);
  }).catch(error => {
    console.log(error);
  })

app.get("/", (req, res) => {
  res.json({
    response: "success"
  })
})

// get image
app.get('/image/:key', (req, res, next) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.on('error', () => {
    res.sendStatus(400);
    return next();
  })
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
  const allBlogs = await blogModel.find().then(userResponse => {
    res.status(200).json(userResponse)
  })
    .catch(error => {
      res.status(400).send(error)
    });
});

app.get('/getRecentBlogs/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const blogs = await blogModel.find({ author: username})
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).send(error);
  }
})

app.get('/getBookmarkedBlogs/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const blogs = await userModel.findOne({ username }, "bookmarks").populate("bookmarks")
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).send(error);
  }
})

app.get('/getBlog/:id', async (req, res) => {
  const blogNum = req.params.id;
  const query = { _id: blogNum };
  const blog = await blogModel.findById(query).then(userResponse => {
    res.status(200).json(userResponse)
  })
    .catch(error => {
      res.status(400).send(error)
    })
});

app.post('/createBlog', async (req, res) => {
  const { topic, description, author, annonymusFlag, tags, comments } = req.body;
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
    res.status(200).json(blog)
  })
    .catch(error => {
      res.status(400).send(error)
    })

});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username, email, password);
  const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] });

  if (user) {
    res.status(400).send("User Exists");
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  console.log(encryptedPassword)
  const query = {
    username: username,
    email: email,
    password: encryptedPassword
  };

  newUser = new userModel(query);
  let result = await newUser.save().then(newUser => {
    const token = jwt.sign(
      { user_id: newUser._id, email },
      tokenKey,
      {
        expiresIn: "2h",
      }
    );
    // save user token

    newUser.token = token;
    res.status(200).json(newUser)
  })
    .catch(error => {
      console.log(error)
      res.status(400).send(error)
    })

});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    const user = await userModel.findOne({ username: username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username: user.username },
        tokenKey,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      res.status(200).json(user);
    }
    else if (!user) {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).send(err)
  }
});

app.put('/updateprofile/:profileid', async (req, res) => {
  try {
    const id = req.params.profileid;
    const { name, aboutme, city, phone, imgKey } = req.body;
    const user = await userModel.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          aboutme: aboutme,
          city: city,
          phone: phone,
          imgKey: imgKey
        }
      }
    )
    if (user.matchedCount == 0) {
      res.status(400).send('User Not Found');
    }
    else if (user.modifiedCount == 0) {
      res.status(400).send('Nothing to Update');
    }
    else {
      res.status(200).send("Updated Successfully");
    }
  } catch (error) {
    res.status(500).send(error);
  }

})

app.get('/user/:username', async (req, res) => {
  const username = req.params.username;
  const query = { username: username };
  const user = await userModel.findOne(query).then(userResponse => {
    res.status(200).json(userResponse)
  })
    .catch(error => {
      res.status(400).send(error)
    })
});

app.get('/test', authMiddleware, async (req, res) => {
  res.status(200).json({
    Authenticated: true
  })
})

app.post('/comment/:blogid', async (req, res, next) => {
  const blogId = req.params.blogid;
  try {
    const blog = await blogPostModel.findById(blogId)
  } catch (error) {
    return res.status(400).send("Invalid blog id");
  }
  const description = req.body.comment;
  const query = {
    blogId,
    description
  }

  const saveComment = async () => {
    const comment = new commentModel(query);
    await comment
      .save()
      .then(response => {
        res.status(200).send("Comment added successfully");
      })
      .catch(error => {
        res.status(400).send(error);
      })
  }

  const isAnonymous = req.body.isAnonymous;
  if (!isAnonymous) {
    return authMiddleware(req, res, async () => {
      const user = await userModel.findOne({ username: req.user.username });
      if (user !== null) {
        query.userId = user._id;
        await saveComment();
      } else {
        res.sendStatus(403)
      }
      next();
    });
  }
  saveComment();
})

app.get('/comments/:blogid', async (req, res) => {
  const blogId = req.params.blogid;
  const comments = await commentModel
    .find({ blogId })
    .sort({ createdAt: 'descending' })
    .populate("userId", "username");
  res.json(comments);
})

app.get('/toggleBookmark/:blogid', authMiddleware, async (req, res) => {
  try {
    const username = req.user.username;
    const blogId = req.params.blogid;
    const user = await userModel.findOne({ username })
    if (user.bookmarks.includes(blogId)) {
      const newBookmarks = user.bookmarks.filter(bookmark => bookmark !== blogId);
      user.bookmarks = newBookmarks;
    } else {
      user.bookmarks.push(blogId)
    }
    user.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error);
  }
})

app.listen(port, () => console.log("[backend] listening on port " + port));

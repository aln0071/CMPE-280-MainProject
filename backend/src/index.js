const express = require('express');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile, getFileStream } = require('./s3');
const { getConnection } = require('./dbconnect');


const app = express();

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

app.listen(port, () => console.log("[backend] listening on port " + port));

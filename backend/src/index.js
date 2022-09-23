const express = require('express');

const app = express();

const port = 3001;

app.get("/", (req, res) => {
    res.json({
        response: "success"
    })
})

app.listen(port, () => console.log("[backend] listening on port "+port));
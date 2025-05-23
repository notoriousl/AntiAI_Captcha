const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.post('/validate-captcha', (req, res) => {
    const { selected } = req.body;  
    const correctImages = ["images/cat2.jpg", "images/cat3.jpg", "images/cat4.jpg","images/cat4.jpg"]; 

    // Validate the user's selection
    const isValid = selected.length === correctImages.length &&
                    selected.every(src => correctImages.includes(src));

    if (isValid) {
        res.json({ success: true }); 
    } else {
        res.json({ success: false }); 
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});

/*
{
  "name": "captcha-project",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}*/
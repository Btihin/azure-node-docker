const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

/** Endpoint pro hlavní stránku */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

const express = require('express');
const app = express();
const port = 3000;

// Definisci una route per la radice del sito (es. http://localhost:3000/)
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Avvia il server Express.js sulla porta specificata (in questo caso, 3000)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

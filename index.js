const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'DevSecOps Lab' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

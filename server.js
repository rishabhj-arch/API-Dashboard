const express = require('express');
const dataRouter = require('./routes/data.js');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api', dataRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

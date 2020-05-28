const colors = require('colors');
const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API running'));

// Mount/connect routers to their own specific uri/path/endpoint
app.use('/api/v1/users', require('./routes/api/users'));
app.use('/api/v1/auth', require('./routes/api/auth'));
app.use('/api/v1/profile', require('./routes/api/profile'));
app.use('/api/v1/posts', require('./routes/api/posts'));

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`.yellow.bold)
);

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const reportRoutes = require('./routes/reportRoutes');
const staffRoutes = require('./routes/staffRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Use the routes
app.use('/api/reports', reportRoutes);
app.use('/api/staff', staffRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/db'); 
const route = require('./routes/route');

app.use(cors({
  origin: 'http://localhost:5173' 
}));

// Parsing middleware
app.use(express.json());
app.use('/api', route);
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is a test' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

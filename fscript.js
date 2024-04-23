// Import required modules
const express = require('express'); // Import Express framework
const mysql = require('mysql'); // Import MySQL module
const bodyParser = require('body-parser'); // Import body-parser middleware

// Create Express app
const app = express(); // Initialize Express app
const port = 3000; // Set port number

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost', // MySQL host
  user: 'root', // MySQL user
  password: '', // MySQL password
  database: 'cp' // MySQL database name
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) throw err; // Throw error if connection fails
  console.log('Connected to MySQL'); // Log connection success
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Serve static files
app.use(express.static(__dirname)); // Serve static files from current directory

// Route to fetch fertilizer data
app.get('/fertilizers', (req, res) => {
  const sql = 'SELECT * FROM fertilizer'; // SQL query to fetch fertilizer data
  connection.query(sql, (err, result) => { // Execute SQL query
    if (err) throw err; // Throw error if query fails
    res.json(result); // Send fetched data as JSON response
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Log server start message
});

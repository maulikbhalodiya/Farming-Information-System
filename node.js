const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create connection to MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cp'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Route to handle form submission and insert new crop information into the database
app.post('/update_crop', (req, res) => {
    const { CropName, Temperature, Duration, Description, ProfitableSoilType, PriceRange, Image } = req.body;

    const sql = `INSERT INTO crops (CropName, Temperature, Duration, Description, ProfitableSoilType, PriceRange, Image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [CropName, Temperature, Duration, Description, ProfitableSoilType, PriceRange, Image], (err, result) => {
        if (err) {
            console.error('Error inserting new crop information:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('New crop information inserted successfully');
            res.redirect('/admin'); // Redirect to admin dashboard or any other appropriate page
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');


const app = express();
const port = 3000;

// Set up session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));    

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(__dirname));

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

// Define storage for the uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Set the filename to the original name of the uploaded file
    }
});

// Create an instance of multer middleware
const upload = multer({ storage: storage });

// API endpoint for fetching fertilizer data
app.get('/fertilizers', (req, res) => {
    const sql = `SELECT * FROM fertilizer`;
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            throw err;
        }
        res.json(result);
    });
});

app.get('/crops', (req, res) => {
    const sql = `SELECT * FROM Crop`;
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            throw err;
        }
        res.json(result);
    });
});

app.get('/pesticides', (req, res) => {
    const sql = `SELECT * FROM pesticide`;
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            throw err;
        }
        res.json(result);
    });
});

// Register route
app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Add validation for password match
    if (password !== confirmPassword) {
        return res.send('<script>alert("Passwords do not match"); window.location.href="/register.html";</script>');
    }

    // Insert data into the database
    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    connection.query(sql, [username, email, password], (err, result) => {
        if (err) throw err;
        console.log('User registered successfully');
        res.redirect('/login.html');
    });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    connection.query(sql, [username, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.redirect('/home.html');
        } else {
            res.send('<script>alert("Wrong username or password"); window.location.href="/login.html";</script>');
        }
    });
});

// Forgot Password route
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    // Check if the email exists in the database
    const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
    connection.query(checkEmailQuery, [email], (err, result) => {
        if (err) {
            console.log(err);
            res.send('<script>alert("Error checking email"); window.location.href="/forgot-password.html";</script>');
        } else {
            if (result.length === 0) {
                // Email not found in the database
                res.send('<script>alert("Email not found"); window.location.href="/forgot-password.html";</script>');
            } else {
                // Email found, generate OTP and store in session
                const otp = Math.floor(100000 + Math.random() * 900000);
                console.log(`OTP for ${email}: ${otp}`);
                req.session.otp = otp;
                req.session.email = email;
                // Set OTP expiration time (in seconds)
                req.session.otpExpiration = Date.now() + 60 * 1000; // 60 seconds
                // Create a Nodemailer transporter
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'projectcp44@gmail.com',
                        pass: 'bhyp whgd ppdg gihl'
                    }
                });
                // Define email options
                const mailOptions = {
                    from: 'projectcp44@gmail.com',
                    to: email,
                    subject: 'Forgot Password OTP from Maulik and team',
                    text: `Hello this mail  is regarding your password reset request.\nYour One Time Password is : ${otp}`
                };
                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        res.send('<script>alert("Error sending OTP"); window.location.href="/forgot-password.html";</script>');
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.redirect('/verify-otp.html');
                    }
                });
            }
        }
    });
});

// Verify OTP route
app.post('/verify-otp', (req, res) => {
    const { otp, newPassword } = req.body;
    const storedOTP = req.session.otp;
    const storedEmail = req.session.email;
    // Check if OTP has expired
    if (Date.now() > req.session.otpExpiration) {
        res.send('<script>alert("OTP has expired. Please request a new one."); window.location.href="/forgot-password.html";</script>');
    } else {
        if (otp == storedOTP) {
            const sql = `UPDATE users SET password = ? WHERE email = ?`;
            connection.query(sql, [newPassword, storedEmail], (err, result) => {
                if (err) throw err;
                console.log('Password updated successfully');
                res.redirect('/login.html');
            });
        } else {
            res.send('<script>alert("Invalid OTP"); window.location.href="/verify-otp.html";</script>');
        }
    }
});

const storagecrop = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Set the filename to the original name of the uploaded file
    }
});

// Create an instance of multer middleware for crop uploads
const uploadcrop = multer({ storage: storagecrop });

// API endpoint for fetching all crop details
app.get('/all_crops', (req, res) => {
    const sql = `SELECT * FROM Crop`;
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            throw err;
        }
        res.json(result);
    });
});

// API endpoint for fetching crop details by ID
app.get('/crop_details/:id', (req, res) => {
    const cropId = req.params.id;
    const sql = 'SELECT * FROM Crop WHERE id = ?';
    connection.query(sql, [cropId], (err, result) => {
        if (err) {
            console.error('Error fetching crop details:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.length === 0) {
            return res.status(404).send('Crop not found');
        }
        res.json(result[0]);
    });
});

// Route for editing or inserting crop details
app.post('/submit_crop', uploadcrop.single('image'), (req, res) => {
    const { id, CropName, Temperature, Duration, Description, ProfitableSoilType, PriceRange } = req.body;
    const imagePath = req.file ? req.file.path : null; // Get the path of the uploaded image

    // Check if all fields are provided
    if (!CropName || !Temperature || !Duration || !Description || !ProfitableSoilType || !PriceRange) {
        return res.status(400).send('All fields are required');
    }

    // Read the image file if provided
    fs.readFile(imagePath, (err, imageBuffer) => {
        if (err) {
            console.error('Error reading image file:', err);
            return res.status(500).send('Internal Server Error');
        }

        // If an ID is provided, it's an edit request
        if (id) {
            // Update crop data in the database, including the image file data if available
            const sql = `UPDATE Crop SET CropName=?, Temperature=?, Duration=?, Description=?, ProfitableSoilType=?, PriceRange=?, Image=? WHERE id=?`;
            connection.query(sql, [CropName, Temperature, Duration, Description, ProfitableSoilType, PriceRange, imageBuffer, id], (err, result) => {
                console.log('Crop updated successfully');
                res.redirect('/admin_dashboard.html'); // Redirect to admin dashboard or any other appropriate page
            });
        } 
    });
});


// Route for inserting a new crop
app.post('/insert_crop', uploadcrop.single('image'), (req, res) => {
    const { CropName, Temperature, Duration, Description, ProfitableSoilType, PriceRange } = req.body;
    const imageFile = req.file; // Uploaded image file

    // Check if all fields are provided
    if (!CropName || !Temperature || !Duration || !Description || !ProfitableSoilType || !PriceRange || !imageFile) {
        return res.status(400).send('All fields are required');
    }

    // Read the image file and convert it to binary
    fs.readFile(imageFile.path, (err, imageBuffer) => {
        if (err) {
            console.error('Error reading image file:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Perform the database insertion
        const sql = `INSERT INTO Crop (CropName, Temperature, Duration, Description, ProfitableSoilType, PriceRange, Image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        connection.query(sql, [CropName, Temperature, Duration, Description, ProfitableSoilType, PriceRange, imageBuffer], (err, result) => {
            if (err) {
                console.error('Error inserting crop data:', err);
                return res.status(500).send('Internal Server Error');
            }
            console.log('Crop inserted successfully');
            res.sendStatus(200);
        });
    });
});

// Route for deleting a crop
app.delete('/delete_crop/:id', (req, res) => {
    const cropId = req.params.id;
    const sql = 'DELETE FROM Crop WHERE id = ?';
    connection.query(sql, [cropId], (err, result) => {
        if (err) {
            console.error('Error deleting crop:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Crop not found');
        }
        console.log('Crop deleted successfully');
        res.sendStatus(200);
    });
});


const storagefertilizer = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Set the filename to the original name of the uploaded file
    }
});

// Create an instance of multer middleware for fertilizer uploads
const uploadfertilizer = multer({ storage: storagefertilizer });

// API endpoint for fetching all fertilizer details
app.get('/all_fertilizers', (req, res) => {
    const sql = `SELECT * FROM Fertilizer`;
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            throw err;
        }
        res.json(result);
    });
});

// API endpoint for fetching fertilizer details by ID
app.get('/fertilizer_details/:id', (req, res) => {
    const fertilizerId = req.params.id;
    const sql = 'SELECT * FROM Fertilizer WHERE id = ?';
    connection.query(sql, [fertilizerId], (err, result) => {
        if (err) {
            console.error('Error fetching fertilizer details:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.length === 0) {
            return res.status(404).send('Fertilizer not found');
        }
        res.json(result[0]);
    });
});

// Route for editing or inserting fertilizer details
app.post('/submit_fertilizer', uploadfertilizer.single('image'), (req, res) => {
    const { id, Name, Use, Components, Description } = req.body;
    const imagePath = req.file ? req.file.path : null; // Get the path of the uploaded image

    // Check if all fields are provided
    if (!Name || !Use || !Components || !Description) {
        return res.status(400).send('All fields are required');
    }

    // Read the image file if provided
    fs.readFile(imagePath, (err, imageBuffer) => {
        if (err) {
            console.error('Error reading image file:', err);
            return res.status(500).send('Internal Server Error');
        }

        // If an ID is provided, it's an edit request
        // If an ID is provided, it's an edit request
        if (id) {
            // Update fertilizer data in the database, including the image file data if available
            const sql = `UPDATE Fertilizer SET Name=?, \`Use\`=?, Components=?, Description=?, Image=? WHERE id=?`;
            connection.query(sql, [Name, Use, Components, Description, imageBuffer, id], (err, result) => {
                if (err) {
                    console.error('Error updating fertilizer data:', err);
                    return res.status(500).send('Internal Server Error');
                }
                console.log('Fertilizer updated successfully');
                res.redirect('/admin_dashboard.html'); // Redirect to admin dashboard or any other appropriate page
            });
        } 

    });
});


// Route for inserting a new fertilizer
app.post('/insert_fertilizer', uploadfertilizer.single('image'), (req, res) => {
    const { Name, Use, Components, Description } = req.body;
    const imageFile = req.file; // Uploaded image file

    // Check if all fields are provided
    if (!Name || !Use || !Components || !Description || !imageFile) {
        return res.status(400).send('All fields are required');
    }

    // Read the image file and convert it to binary
    fs.readFile(imageFile.path, (err, imageBuffer) => {
        if (err) {
            console.error('Error reading image file:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Perform the database insertion
        const sql = `INSERT INTO Fertilizer (Name, \`Use\`, Components, Description, Image) VALUES (?, ?, ?, ?, ?)`;
        connection.query(sql, [Name, Use, Components, Description, imageBuffer], (err, result) => {
            if (err) {
                console.error('Error inserting fertilizer data:', err);
                return res.status(500).send('Internal Server Error');
            }
            console.log('Fertilizer inserted successfully');
            res.sendStatus(200);
        });
    });
});

// Route for deleting a fertilizer
app.delete('/delete_fertilizer/:id', (req, res) => {
    const fertilizerId = req.params.id;
    const sql = 'DELETE FROM Fertilizer WHERE id = ?';
    connection.query(sql, [fertilizerId], (err, result) => {
        if (err) {
            console.error('Error deleting fertilizer:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Fertilizer not found');
        }
        console.log('Fertilizer deleted successfully');
        res.sendStatus(200);
    });
});


const storagePesticide = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Set the filename to the original name of the uploaded file
    }
});

// Create an instance of multer middleware for pesticide uploads
const uploadPesticide = multer({ storage: storagePesticide });

// API endpoint for fetching all pesticide details
app.get('/all_pesticides', (req, res) => {
    const sql = `SELECT * FROM Pesticide`;
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            throw err;
        }
        res.json(result);
    });
});

// API endpoint for fetching pesticide details by ID
app.get('/pesticide_details/:id', (req, res) => {
    const pesticideId = req.params.id;
    const sql = 'SELECT * FROM Pesticide WHERE id = ?';
    connection.query(sql, [pesticideId], (err, result) => {
        if (err) {
            console.error('Error fetching pesticide details:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.length === 0) {
            return res.status(404).send('Pesticide not found');
        }
        res.json(result[0]);
    });
});

// Route for editing or inserting pesticide details
app.post('/submit_pesticide', uploadPesticide.single('image'), (req, res) => {
    const { id, ProductName, Description, Mode_of_Action, Crops, Dosage_per_Acre, Pack_Size, Features_and_Benefits } = req.body;
    const imagePath = req.file ? req.file.path : null; // Get the path of the uploaded image

    // Check if all fields are provided
    if (!ProductName || !Description || !Mode_of_Action || !Crops || !Dosage_per_Acre || !Pack_Size || !Features_and_Benefits) {
        return res.status(400).send('All fields are required');
    }

    // Read the image file if provided
    fs.readFile(imagePath, (err, imageBuffer) => {
        if (err) {
            console.error('Error reading image file:', err);
            return res.status(500).send('Internal Server Error');
        }

        // If an ID is provided, it's an edit request
        if (id) {
            // Update pesticide data in the database, including the image file data if available
            const sql = `UPDATE Pesticide SET ProductName=?, Description=?, Mode_of_Action=?, Crops=?, Dosage_per_Acre=?, Pack_Size=?, Features_and_Benefits=?, Image=? WHERE id=?`;
            connection.query(sql, [ProductName, Description, Mode_of_Action, Crops, Dosage_per_Acre, Pack_Size, Features_and_Benefits, imageBuffer, id], (err, result) => {
                console.log('Pesticide updated successfully');
                res.redirect('/admin_dashboard.html'); // Redirect to admin dashboard or any other appropriate page
            });
        } 
    });
});

// Route for inserting a new pesticide
app.post('/insert_pesticide', uploadPesticide.single('image'), (req, res) => {
    const { ProductName, Description, Mode_of_Action, Crops, Dosage_per_Acre, Pack_Size, Features_and_Benefits } = req.body;
    const imageFile = req.file; // Uploaded image file

    // Check if all fields are provided
    if (!ProductName || !Description || !Mode_of_Action || !Crops || !Dosage_per_Acre || !Pack_Size || !Features_and_Benefits || !imageFile) {
        return res.status(400).send('All fields are required');
    }

    // Read the image file and convert it to binary
    fs.readFile(imageFile.path, (err, imageBuffer) => {
        if (err) {
            console.error('Error reading image file:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Perform the database insertion
        const sql = `INSERT INTO Pesticide (ProductName, Description, Mode_of_Action, Crops, Dosage_per_Acre, Pack_Size, Features_and_Benefits, Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(sql, [ProductName, Description, Mode_of_Action, Crops, Dosage_per_Acre, Pack_Size, Features_and_Benefits, imageBuffer], (err, result) => {
            if (err) {
                console.error('Error inserting pesticide data:', err);
                return res.status(500).send('Internal Server Error');
            }
            console.log('Pesticide inserted successfully');
            res.sendStatus(200);
        });
    });
});

// Route for deleting a pesticide
app.delete('/delete_pesticide/:id', (req, res) => {
    const pesticideId = req.params.id;
    const sql = 'DELETE FROM Pesticide WHERE id = ?';
    connection.query(sql, [pesticideId], (err, result) => {
        if (err) {
            console.error('Error deleting pesticide:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Pesticide not found');
        }
        console.log('Pesticide deleted successfully');
        res.sendStatus(200);
    });
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to fetch all user details
app.get('/user_details', (req, res) => {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});

// Route to fetch user details by ID
app.get('/user_details/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';
    connection.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(result[0]);
    });
});

// Route to update user details
app.post('/edit_user/:id', (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    const sql = 'UPDATE users SET username=?, email=?, password=? WHERE id=?';
    connection.query(sql, [username, email, password, userId], (err, result) => {
        if (err) {
            console.error('Error updating user details:', err);
            return res.status(500).send('Internal Server Error');
        }
        // Redirect with success message after 2 seconds
        res.send('<script>alert("User details updated successfully"); setTimeout(function(){window.location.href="/user_management.html";}, 500);</script>');
    });
});


app.get('/suggestions', (req, res) => {
    const sql = 'SELECT * FROM suggestions';
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).send('Error fetching suggestions');
      } else {
        res.json(result);
      }
    });
  });
  
  


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

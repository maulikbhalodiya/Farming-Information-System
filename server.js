const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

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

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

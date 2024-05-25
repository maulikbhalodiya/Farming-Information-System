<?php
// Connect to your database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cp";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to fetch options from the specified table
function fetchOptions($tableName) {
    global $conn;
    $sql = "SELECT name FROM $tableName"; // Assuming the column name is 'name'
    $result = $conn->query($sql);
    $options = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $options[] = $row['name'];
        }
    }
    return $options;
}

// Fetch options for each table
$cropOptions = fetchOptions("crop");
$fertilizerOptions = fetchOptions("fertilizer");
$pesticideOptions = fetchOptions("pesticide");

// Return options as JSON
$options = array(
    "crop" => $cropOptions,
    "fertilizer" => $fertilizerOptions,
    "pesticide" => $pesticideOptions
);
echo json_encode($options);

$conn->close();
?>
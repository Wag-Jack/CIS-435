<?php
$host = "localhost";
$user = "root";
$pass = ""; // Leave this empty sinjce MySQL root has no password in XAMPP
$dbname = "job_applications";
$port = 3306;

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Rest is filled in with ChatGPT
// ---- Automatically create table if it does NOT exist ----
$tableQuery = "
CREATE TABLE IF NOT EXISTS applicants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    resume VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
";

if (!$conn->query($tableQuery)) {
    die('Error creating table: ' . $conn->error);
}

?>
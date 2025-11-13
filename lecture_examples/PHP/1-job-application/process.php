<?php
include 'database.php';
include 'Applicant.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Handle file upload
    $resume = $_FILES['resume'];
    $resumePath = "uploads/" . basename($resume["name"]);
    move_uploaded_file($resume["tmp_name"], $resumePath);

    // Create an Applicant object
    $applicant = new Applicant($name, $email, $phone, $resumePath, $message);

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO applicants (name, email, phone, resume, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $applicant->name, $applicant->email, $applicant->phone, $applicant->resume, $applicant->message);
    $stmt->execute();

    // Redirect to success page
    header("Location: success.php");
    exit();
}
?>
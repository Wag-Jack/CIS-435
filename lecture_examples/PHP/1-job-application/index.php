<?php include 'database.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Application</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h2>Job Application Form</h2>
    <form action="process.php" method="POST" enctype="multipart/form-data">
        <label for="name">Full Name:</label>
        <input type="text" name="name" required>

        <label for="email">Email:</label>
        <input type="email" name="email" required>

        <label for="phone">Phone:</label>
        <input type="text" name="phone">

        <label for="resume">Upload Resume (PDF):</label>
        <input type="file" name="resume" accept=".pdf" required>

        <label for="message">Why do you want this job?</label>
        <textarea name="message" required></textarea>

        <button type="submit">Submit Application</button>
    </form>
</body>
</html>
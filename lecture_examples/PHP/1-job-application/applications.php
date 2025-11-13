<?php
include 'database.php';
$result = $conn->query("SELECT * FROM applicants ORDER BY id DESC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Submitted Applications</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h2 class="center">Submitted Applications</h2>
    <table class="app-table">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Resume</th>
            <th>Message</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?= htmlspecialchars($row['name']) ?></td>
            <td><?= htmlspecialchars($row['email']) ?></td>
            <td><?= htmlspecialchars($row['phone']) ?></td>
            <td><a href="<?= $row['resume'] ?>" target="_blank">View</a></td>
            <td><?= htmlspecialchars($row['message']) ?></td>
        </tr>
        <?php endwhile; ?>
    </table>
</body>
</html>
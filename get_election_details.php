<?php
// Database connection details
$host = 'localhost';
$db   = 'ballot_box';
$user = 'your_username';
$pass = 'your_password';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

// Get the election ID from the query string
$electionId = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Prepare and execute the query
$stmt = $pdo->prepare("SELECT * FROM elections WHERE id = ?");
$stmt->execute([$electionId]);
$election = $stmt->fetch();

// Return the result as JSON
header('Content-Type: application/json');
echo json_encode($election);

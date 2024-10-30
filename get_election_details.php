<?php
require_once 'config.php';

// Get the election ID from the query string
$electionId = isset($_GET['id']) ? intval($_GET['id']) : 0;

try {
    $pdo = new PDO($dsn, null, null, $options);
    
    // Prepare and execute the query
    $stmt = $pdo->prepare("SELECT * FROM elections WHERE id = ?");
    $stmt->execute([$electionId]);
    $election = $stmt->fetch();

    // Return the result as JSON
    header('Content-Type: application/json');
    echo json_encode($election);
} catch (\PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Internal server error"]);
}

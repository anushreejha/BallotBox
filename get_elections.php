<?php
require_once 'config.php';

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    
    $stmt = $pdo->query("SELECT id, name FROM elections");
    $elections = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    header('Content-Type: application/json');
    echo json_encode($elections);
} catch (\PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Internal server error"]);
}

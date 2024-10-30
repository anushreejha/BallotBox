<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

if (!$username || !$email || !$password) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    
    // Check if username or email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(["error" => "Username or email already exists"]);
        exit;
    }
    
    // Insert new user
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$username, $email, $hashedPassword]);
    
    echo json_encode(["message" => "User registered successfully"]);
} catch (\PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Internal server error"]);
}

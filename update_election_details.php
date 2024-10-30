<?php
require_once 'config.php';
session_start();

$data = json_decode(file_get_contents('php://input'), true);
$electionId = $data['electionId'] ?? null;
$placeToVote = $data['placeToVote'] ?? null;
$wantToVote = $data['wantToVote'] ? 1 : 0;

if (!$electionId || !$placeToVote) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

try {
    $pdo = new PDO($dsn, null, null, $options);

    $stmt = $pdo->prepare("UPDATE user_elections SET place_to_vote = ?, want_to_vote = ? WHERE election_id = ? AND user_id = ?");
    $stmt->execute([$placeToVote, $wantToVote, $electionId, $_SESSION['user_id']]);

    echo json_encode(["message" => "Election details updated successfully"]);
} catch (\PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Internal server error"]);
}

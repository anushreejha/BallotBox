<?php
// Path to SQLite database file
$dbPath = __DIR__ . '/ballot_box.sqlite'; // Adjust the path if needed

// Data Source Name (DSN) for SQLite
$dsn = "sqlite:$dbPath";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
?>

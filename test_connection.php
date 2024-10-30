<?php
require_once 'config.php';

try {
    $pdo = new PDO($dsn, null, null, $options);
    echo "SQLite database connection successful!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

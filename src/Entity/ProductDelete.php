<?php
require 'DBConnection.php';

$str = explode('/', $_SERVER['REQUEST_URI']);

$conn = new DBConnection();
$result = $conn->query("UPDATE products
						SET deleted = 1
						WHERE product_id = ".end($str)); 
$conn->close();
echo json_encode(['result' => $result]);

?>
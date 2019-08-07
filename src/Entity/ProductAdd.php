<?php
require 'DBConnection.php';

$name = $_POST['name'];
$count = isset($_POST['count']) && $_POST['count'] !== '' ? (int)$_POST['count'] : "NULL";
$price = isset($_POST['price']) && $_POST['price'] !== '' ? (float)$_POST['price'] : "NULL";
$category_id = isset($_POST['category_id']) && $_POST['category_id'] !== '' ? (int)$_POST['category_id'] : "NULL";

$conn = new DBConnection();
$result = $conn->query("INSERT INTO products(product_name, product_count, product_price, category_id) 
							VALUES ('".$name."', ".$count.", ".$price.", ".$category_id.")");
$conn->close();
echo json_encode(['result' => $result]);

?>
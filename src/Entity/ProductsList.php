<?php
require 'DBConnection.php';

$countPerPage = isset($_GET['countPerPage']) ? (int)$_GET['countPerPage'] : 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

$conn = new DBConnection();
$productsCount = $conn->query("	SELECT COUNT(product_id) as count
								FROM products
								WHERE deleted = 0");

$products = $conn->query("SELECT product_id as id, 
								product_name as name, 
								product_count as count, 
								product_price as price,
								(SELECT category_name
								FROM categories
								WHERE categories.category_id = products.category_id) as category_name
						FROM products
						WHERE deleted = 0
						ORDER BY product_price ASC
						LIMIT ".($countPerPage*($page-1)).", ".$countPerPage);
$conn->close();
echo json_encode(['products'=>$products, 'productsCount' => $productsCount['count']]);
?>
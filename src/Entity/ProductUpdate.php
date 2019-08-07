<?php
require 'DBConnection.php';

$str = explode('/', $_SERVER['REQUEST_URI']);

$conn = new DBConnection();
if(!empty($_POST)){
	$result = $conn->query('UPDATE products
							SET product_name = "'.$_POST['name'].'",
							product_count = '.(isset($_POST['count']) && $_POST['count'] !== '' ? (int)$_POST['count'] : "NULL").',
							product_price = '.(isset($_POST['price']) && $_POST['price'] !== '' ? (float)$_POST['price'] : "NULL").',
							category_id = '.(int)$_POST['category_id'].' 
							WHERE product_id = '.end($str)); 
} else {
	$categories = $conn->query('SELECT * FROM categories WHERE deleted = 0 ORDER BY category_name ASC');
	$product = $conn->query('SELECT * FROM products WHERE product_id = '.end($str));
}
$conn->close();

echo "
<!DOCTYPE html>
<html lang='en-US'>
	<head>
		"; 
include('../../templates/includes/header.html'); 
echo " 
		<title>Update product</title>
	</head>
	<body>
		<div class='container'>
			<nav aria-label='breadcrumb'>
				<ol class='breadcrumb'>
					<li class='breadcrumb-item'><a href='/'>Home</a></li>
					<li class='breadcrumb-item'><a href='/#task6'>Product list</a></li>
					<li class='breadcrumb-item active' aria-current='page'>Update product</li>
				</ol>
			</nav>";
		if(!isset($product)) {
			echo "
			<div>No such product</div>
			";
		} else {
		echo "
			<form id='updateForm'>
				<div class='form-row'>
					<div class='form-group col-md-9'>
						<label for='name'>Name</label>
						<input type='text' class='form-control' name='name' value='".$product['product_name']."' placeholder='Name'>
					</div>
					<div class='form-group col-md-3'>
						<label for='count'>Count</label>
						<input type='text' class='form-control' name='count' value='".$product['product_count']."' placeholder='Count'>
					</div>
				</div>
				<div class='form-row'>
					<div class='form-group col-md-5'>
						<label for='price'>Price</label>
						<input type='text' class='form-control' name='price' value='".$product['product_price']."' placeholder='Double value'>
					</div>
					<div class='form-group col-md-7'>
						<label for='category_id'>Category</label>
						<select class='form-control' name='category_id'>
						";
						foreach ($categories as $category) {
							echo '<option value='.$category['category_id'].' '.($category['category_id'] === $product['category_id'] ? 'selected' : '').'>'.$category['category_name'].'</option>';
						}
					echo "
						</select>
					</div>
				</div>
				<div class='text-right'>
					<button type='submit' class='btn btn-success' id='update' disabled>Update</button>
				</div>
			</form>";
		}
		echo "
		</div>
	</body>
	<script src='/assets/js/updateProduct.js'></script>
</html>

";
?>
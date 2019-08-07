<?php
require 'DBConnection.php';

$conn = new DBConnection();
$categories = $conn->query('Select * FROM categories');
$conn->close();

echo "
<!DOCTYPE html>
<html lang='en-US'>
	<head>
		"; 
include('../../templates/includes/header.html'); 
echo " 
		<title>Create product</title>
	</head>
	<body>
		<div class='container'>
			<nav aria-label='breadcrumb'>
				<ol class='breadcrumb'>
					<li class='breadcrumb-item'><a href='/'>Home</a></li>
					<li class='breadcrumb-item'><a href='/#task6'>Product list</a></li>
					<li class='breadcrumb-item active' aria-current='page'>Create product</li>
				</ol>
			</nav>
			<form id='addForm'>
				<div class='form-row'>
					<div class='form-group col-md-9'>
						<label for='name'>Name</label>
						<input type='text' class='form-control' name='name' placeholder='Name'>
					</div>
					<div class='form-group col-md-3'>
						<label for='count'>Count</label>
						<input type='text' class='form-control' name='count' placeholder='Count'>
					</div>
				</div>
				<div class='form-row'>
					<div class='form-group col-md-5'>
						<label for='price'>Price</label>
						<input type='text' class='form-control' name='price' placeholder='Double value'>
					</div>
					<div class='form-group col-md-7'>
						<label for='category_id'>Category</label>
						<select class='form-control' name='category_id'>
						";
						foreach ($categories as $category) {
							echo '<option value='.$category['category_id'].'>'.$category['category_name'].'</option>';
						}
					echo "
						</select>
					</div>
				</div>
				<div class='text-right'>
					<button type='submit' class='btn btn-success' id='add' disabled>Add</button>
					<div id='result'></div>
				</div>
			</form>
		</div>
	</body>
	<script src='/assets/js/createProduct.js'></script>
</html>

";
?>
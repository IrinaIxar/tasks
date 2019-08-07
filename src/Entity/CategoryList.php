<?php
require 'DBConnection.php';

$conn = new DBConnection();
$categories = $conn->query("SELECT category_name,
								(SELECT COUNT(product_id)
								FROM products
								WHERE products.category_id = categories.category_id) as count
						FROM categories
						WHERE deleted = 0");
$conn->close();

echo "
<!DOCTYPE html>
<html lang='en-US'>
	<head>
		"; 
include('../../templates/includes/header.html'); 
echo " 
		<title>Category list</title>
	</head>
	<body>
		<div class='container'>
			<nav aria-label='breadcrumb'>
				<ol class='breadcrumb'>
					<li class='breadcrumb-item'><a href='/'>Home</a></li>
					<li class='breadcrumb-item'><a href='/#task6'>Product list</a></li>
					<li class='breadcrumb-item active' aria-current='page'>Category list</li>
				</ol>
			</nav>
			<table class='table table-bordered w-50'>
				<thead>
					<tr>
						<th class='align-middle'>Category name</th>
						<th class='text-center' width='25%'>Products count</th>
					</tr>
				</thead>
				<tbody>";
					foreach ($categories as $category) {
						echo "
					<tr>
						<td>".$category['category_name']."</td>
						<td class='text-center' width='25%'>".$category['count']."</td>
					</tr>";
					}
		echo "	</tbody>
			</table>
		</div>
	</body>
</html>

";

?>
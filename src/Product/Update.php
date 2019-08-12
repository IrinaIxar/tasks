<?php
require '../../bootstrap.php';

$str = explode('/', $_SERVER['REQUEST_URI']);

$categoryRepository = $entityManager->getRepository('Category');
$productRepository = $entityManager->getRepository('Product');
$product = $productRepository->find(end($str));

if(!empty($_POST) && isset($product)){
	$category = $categoryRepository->find($_POST['category_id']);

	$product->setName($_POST['name']);
	$product->setPrice((float)$_POST['price']);
	$product->setCategory($category);
	$product->setCount((int)$_POST['count']);

	$entityManager->flush();
} else {
	$categories = $categoryRepository->findBy(['deleted' => 0], ['name' => 'ASC']);
}

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
						<input type='text' class='form-control' name='name' value='".$product->getName()."' placeholder='Name'>
					</div>
					<div class='form-group col-md-3'>
						<label for='count'>Count</label>
						<input type='text' class='form-control' name='count' value='".$product->getCount()."' placeholder='Count'>
					</div>
				</div>
				<div class='form-row'>
					<div class='form-group col-md-5'>
						<label for='price'>Price</label>
						<input type='text' class='form-control' name='price' value='".$product->getPrice()."' placeholder='Double value'>
					</div>
					<div class='form-group col-md-7'>
						<label for='category_id'>Category</label>
						<select class='form-control' name='category_id'>
						";
						foreach ($categories as $category) {
							echo '<option value='.$category->getId().' '.($category->getId() === $product->getCategory()->getId() ? 'selected' : '').'>'.$category->getName().'</option>';
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
	<script src='/assets/js/Product/update.js'></script>
</html>

";
?>
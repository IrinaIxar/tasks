<?php
require '../../Repository/ProductRepository.php';
require '../../Repository/CategoryRepository.php';

$productRepository = new ProductRepository();
$categoryRepository = new CategoryRepository();
$category = $categoryRepository->findById($_POST['category_id']);

$product = new Product();
$product->setName($_POST['name']);
$product->setPrice((float)$_POST['price']);
$product->setCategory($category);
$product->setCount((int)$_POST['count']);

$result = $productRepository->add($product);

echo json_encode(['result' => $result]);

?>
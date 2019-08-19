<?php
require '../../Repository/ProductRepository.php';

$str = explode('/', $_SERVER['REQUEST_URI']);
$productRepository = new ProductRepository();
$result = $productRepository->remove(end($str));

echo json_encode(['result' => $result]);

?>
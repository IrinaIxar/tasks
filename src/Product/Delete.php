<?php
require '../../vendor/doctrine/bootstrap.php';

$str = explode('/', $_SERVER['REQUEST_URI']);

$productRepository = $entityManager->getRepository('Product');
$product = $productRepository->find(end($str));
if (!empty($product)) {
	$product->setDeleted(1);
	$entityManager->flush();
	$result='deleted';
} else {
	$result = 'Product was not found';
}

echo json_encode(['result' => $result]);

?>
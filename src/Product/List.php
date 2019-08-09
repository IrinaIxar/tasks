<?php
require '../../vendor/doctrine/bootstrap.php';

$countPerPage = isset($_GET['countPerPage']) ? (int)$_GET['countPerPage'] : 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

$productRepository = $entityManager->getRepository('Product');
$products = $productRepository->findBy(['deleted' => 0], ['price' => 'ASC'], $countPerPage, ($countPerPage*($page-1)));
$productsCount = $productRepository->count(['deleted' => 0]);

echo json_encode(['products'=>$products, 'productsCount' => $productsCount]);
?>
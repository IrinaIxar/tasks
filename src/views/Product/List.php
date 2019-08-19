<?php
require '../../Repository/ProductRepository.php';

$countPerPage = isset($_GET['countPerPage']) ? (int)$_GET['countPerPage'] : 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

$productRepository = new ProductRepository();

echo json_encode(['products'=>$productRepository->findBy([], $page, $countPerPage), 'productsCount' => count($productRepository->findAll())]);
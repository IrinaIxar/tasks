<?php
require '../../vendor/doctrine/bootstrap.php';

$categoryRepository = $entityManager->getRepository('Category');
$category = $categoryRepository->find($_POST['category_id']);

$product = new Product();
$product->setName($_POST['name']);
$product->setPrice((float)$_POST['price']);
$product->setCategory($category);
$product->setCount((int)$_POST['count']);

$entityManager->persist($product);
$entityManager->flush();

echo json_encode(['result' => $entityManager->contains($product)]);

?>
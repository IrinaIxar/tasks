<?php
// create_product.php <name>
require_once "bootstrap.php";

$newProductName = $argv[1];
$newProductPrice = $argv[2];
$newProductCategoryId = $argv[3];
$newProductCount = $argv[4];

$product = new Product();
$product->setName($newProductName);
$product->setPrice($newProductPrice);
$product->setCategoryId($newProductCategoryId);
$product->setCount($newProductCount);

$entityManager->persist($product);
$entityManager->flush();

echo "Created Product with ID " . $product->getId() . "\n";
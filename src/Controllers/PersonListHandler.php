<?php
require 'CatalogController.php';
require 'PersonController.php';

$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

$list = [];
foreach ($decoded['list'] as $item) {
	$list[] = new Person($item);
}
$personList = new Catalog($list);
$personList->setIntegerFields(['age']);
if($decoded['method'] === 'order') {
	$nestedField = '';
	if($decoded['field'] === 'address') {
		$nestedField = 'country';
	}
	$personList->order($decoded['field'], $nestedField, $decoded['order']);
}

echo json_encode($personList->getCatalog(), JSON_FORCE_OBJECT);
?>
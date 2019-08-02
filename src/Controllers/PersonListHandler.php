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

switch ($decoded['method']) {
    case 'order':
        $nestedField = '';
		if($decoded['field'] === 'address') {
			$nestedField = 'country';
		}
		$personList->order($decoded['field'], $nestedField, $decoded['order']);
        break;
    case 'remove':
    	$form = []; 
    	if(isset($decoded['form'])) {
    		foreach ($decoded['form'] as $row) {
	    		$form[$row['name']] = $row['value'];
	    	}
    	}    	
    	if((!empty($form) && $form['field'] === 'numberValue') || $decoded['position'] !== '') {
    		$index = $form['field'] === 'numberValue' ? $form['string'] : $decoded['position'];
    		$personList->removeByIndex((int)$index);
    	} else if(in_array($form['field'], ['age', 'houseNumber', 'apartmentNumber'])) {
    		$field = $form['field'];
    		$nestedField = '';
    		//if search field is property of Address
			if(in_array($form['field'], ['houseNumber', 'apartmentNumber'])) {
				$field = 'address';
				$nestedField = $form['field'];
			}
    		//we doesn't have fields in Person address property which are numeric, so nestedField is empty
    		$personList->removeByIntegerField($field, $nestedField, $form['range[min]'], $form['range[max]'], $form['emptyValue']);
    	} else {
    		$field = $form['field'];
    		$nestedField = '';
    		//if search field is property of Address
			if(in_array($form['field'], ['country', 'city', 'street', 'houseNumber', 'apartmentNumber'])) {
				$field = 'address';
				$nestedField = $form['field'];
			}
    		$personList->removeByStringField($field, $nestedField, $form['string'], $form['strictComparison'], $form['emptyValue']);
    	}
        break;
    case 'add':
		$personList->setNewPosition(((int)$decoded['position']-1));
        break;
}

echo json_encode($personList->getCatalog(), JSON_FORCE_OBJECT);
?>
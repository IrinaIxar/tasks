<?php
require '../../Repository/PersonRepository.php';

$persons = getPersonRepository();

$address = [];
foreach ($_POST as $key => $value) {
	if(in_array($key, ['country', 'city', 'street', 'houseNumber', 'apartmentNumber'])) {
		$address[$key] = $value;
		unset($_POST[$key]);
	}
}
$address = new Address($address);
$person = new Person($_POST, $address);

$persons->add($person);
$list = $persons->findAll();

echo json_encode($list, JSON_FORCE_OBJECT);
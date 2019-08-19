<?php
require '../../Repository/PersonRepository.php';

$persons = getPersonRepository();

if ($_SERVER['REQUEST_METHOD'] === 'POST' ) {
	if(isset($_POST['field']) && $_POST['field'] === 'position') {
		$persons->remove($_POST['string']);
	} else {
		$persons->removeMany($_POST);
	}
} else {
	$str = explode('/', $_SERVER['REQUEST_URI']);
	$persons->remove(end($str));
}

$list = $persons->findAll();

echo json_encode($list, JSON_FORCE_OBJECT);
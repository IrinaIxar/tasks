<?php
require '../../Repository/PersonRepository.php';

$field = isset($_POST['field']) ? $_POST['field'] : 'position';
$order = isset($_POST['order']) ? $_POST['order'] : 'ASC';

$persons = getPersonRepository();
$list = $persons->findAll($field, $order);

echo json_encode($list, JSON_FORCE_OBJECT);
?>
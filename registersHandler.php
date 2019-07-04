<?php
include ('variables.php');
include ('classes/registers.php');

$registers = new Registers($registersArray);
switch ($_POST['functionname']) {
	case 'getCountries':
		$array = $registers->getData();
		$data = $array['countries'];
		break;
	case 'getRegions':
		$data = $registers->getRegions($_POST['id']);
		break;
	case 'getCities':
		$data = $registers->getCities($_POST['id']);
		break;
	case 'getCityInfo':
		$data = $registers->getCityInfo($_POST['id']);
		break;
}

echo json_encode($data);

?>
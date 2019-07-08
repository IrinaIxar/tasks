<?php
require ('classes/registers.php');
$registers = new Registers();

switch ($_POST['functionname']) {
	case 'countries':
		$data = $registers->getCountries();
		break;
	case 'regions':
		$data = $registers->getRegions($_POST['id']);
		break;
	case 'cities':
		$data = $registers->getCities($_POST['id']);
		break;
	case 'cityInfo':
		$data = $registers->getCityInfo($_POST['id']);
		break;
	default:
		$data = [];
}

echo json_encode($data);

?>
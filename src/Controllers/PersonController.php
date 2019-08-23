<?php
require '../src/Repository/PersonRepository.php';

class PersonController extends Controller {
	protected $persons;

	public function __construct() {
		$catalog = new Catalog();
		$persons = new PersonRepository($catalog);

		$personsArray = [];
		foreach ($persons->getPersons() as $person) {
		    $address = new Address($person['address']);
		    unset($person['address']);
			$personsArray[] = new Person($person, $address);
		}
		$persons->setPersonsToCatalog($personsArray);
		$this->persons = $persons;
	}

	/**
     * Persons list
     *
     * @param string $sort object field is sorted
     * @param string $order asc/desc sort
     * @return string
     */ 
	public function list($sort='position', $order='ASC') {
		echo json_encode($this->persons->findAll($sort, $order), JSON_FORCE_OBJECT);
	}

	/**
     * Add person to list
     *
     * @return mixed string|view 
     */ 
	public function add() {
		$address = [];
		foreach ($_POST as $key => $value) {
			if(in_array($key, ['country', 'city', 'street', 'houseNumber', 'apartmentNumber'])) {
				$address[$key] = $value;
				unset($_POST[$key]);
			}
		}
		$address = new Address($address);
		$person = new Person($_POST, $address);

		$this->persons->add($person);
		$list = $this->persons->findAll();

		echo json_encode($list, JSON_FORCE_OBJECT);
	}

	/**
     * Removes person from list
     *
     * @param integer $id
     * @return string
     */ 
	public function delete($id='') {
		if ($_SERVER['REQUEST_METHOD'] === 'POST' ) {
			if(isset($_POST['field']) && $_POST['field'] === 'position') {
				$this->persons->remove($_POST['string']);
			} else {
				$this->persons->removeMany($_POST);
			}
		} else {
			$this->persons->remove($id);
		}

		$list = $this->persons->findAll();

		echo json_encode($list, JSON_FORCE_OBJECT);
	}
}
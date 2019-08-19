<?php
require_once '../../Entity/Person.php';
require_once '../../Entity/Address.php';
require_once '../../Entity/Catalog.php';

class PersonRepository {
	/**
	 * Array of persons
	 *
	 * @var array
	 */
	protected $persons;

	/**
	 * @var Catalog
	 */
	protected $catalog;

	public function __construct(Catalog $catalog) {
		//getting data from json file
		$content = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/src/resources/persons.json');
		$this->persons = json_decode($content, true);
		$this->catalog = $catalog;
	}

	/**
     * Gets persons array
     *
     * @return array $persons
     */ 
	public function getPersons() {
    	return $this->persons;
    }

    /**
     * Sets to Catalog array of Person objects
     *
     * @param array $list
     */ 
    public function setPersonsToCatalog($list) {
    	$this->catalog->setCatalog($list);
		$this->catalog->setIntegerFields(['age', 'position']);

    }

	/**
     * Products list
     *
     * @param string $field object field is sorted
     * @param string $order asc/desc sort
     * @return array products
     */ 
	public function findAll($field='position', $order='ASC') {		
		$nestedField = '';
		if($field === 'address') {
			$nestedField = 'country';
		}
		$this->catalog->order($field, $nestedField, $order);
		return $this->catalog->getCatalog();
	}

	/**
     * Adds new person
     *
     * @param Person $person
     * @return string
     */ 
	public function add($person) {
		$this->catalog->setNewItem($person, (int)$person->getPosition()-1);
		$this->saveNewPositions();
		$this->saveChangesToSourceFile();
	}

	/**
     * Removes person by position
     *
     * @param integer $position
     * @return string
     */ 
	public function remove($position) {
		$this->catalog->removeByIndex((int)$position);
		$this->saveNewPositions();
		$this->saveChangesToSourceFile();
	}

	/**
     * Removes person by criteria
     *
     * @param array $form
     */ 
	public function removeMany($form) {
		if(in_array($form['field'], ['age', 'houseNumber', 'apartmentNumber'])) {
			$field = $form['field'];
			$nestedField = '';
			//if search field is property of Address
			if(in_array($form['field'], ['houseNumber', 'apartmentNumber'])) {
				$field = 'address';
				$nestedField = $form['field'];
			}
			$min = $form['range']['min'];
			$max = $form['range']['max'];
			$this->catalog->removeByIntegerField($field, $nestedField, $min, $max, $form['emptyValue']);
		} else {
			$field = $form['field'];
			$nestedField = '';
			//if search field is property of Address
			if(in_array($form['field'], ['country', 'city', 'street', 'houseNumber', 'apartmentNumber'])) {
				$field = 'address';
				$nestedField = $form['field'];
			}
			$this->catalog->removeByStringField($field, $nestedField, $form['string'], $form['strictComparison'], $form['emptyValue']);
		}

		$this->saveNewPositions();
		$this->saveChangesToSourceFile();
	}

	/**
	 * Updates positions for all persons via json-server
	 */
	public function saveNewPositions() {
		foreach ($this->catalog->getCatalog() as $key => $person) {
			$person->setPosition(($key+1));
		}
	}

	/**
	 * Updates positions for all persons via json-server
	 */
	public function saveChangesToSourceFile() {
		$fp = fopen($_SERVER['DOCUMENT_ROOT'].'/src/resources/persons.json', 'w');
		fwrite($fp, json_encode($this->catalog->getCatalog()));
		fclose($fp);
	}
}

function getPersonRepository() {
	$catalog = new Catalog();
	$persons = new PersonRepository($catalog);

	$personsArray = [];
	foreach ($persons->getPersons() as $person) {
	    $address = new Address($person['address']);
	    unset($person['address']);
		$personsArray[] = new Person($person, $address);
	}
	$persons->setPersonsToCatalog($personsArray);

	return $persons;
}
<?php 
require 'AddressController.php';

class Person implements JsonSerializable {
	/**
     * Name
     *
     * @var string
     */
	protected $name;

	/**
     * Age
     *
     * @var integer
     */
	protected $age;

	/**
     * Address
     *
     * @var Address
     */
	protected $address;

	/**
     * Phone number
     *
     * @var string
     */
	protected $phoneNumber;

	/**
     * Email
     *
     * @var string
     */
	protected $email;

	/**
     * Gets person name
     *
     * @return $name
     */ 
    public function getName() {
        return $this->name;
    }

    /**
     * Assigns value to person name
     *
     * @param string $name Person name
     */ 
    public function setName($name) {
        $this->name = $name;
    }

    /**
     * Gets age value
     *
     * @return $age
     */ 
    public function getAge() {
        return $this->age;
    }

    /**
     * Assigns value to age property
     *
     * @param string $age age value
     */ 
    public function setAge($age) {
        $this->age = (int)$age;
    }

    /**
     * Gets address
     *
     * @return Address
     */ 
    public function getAddress() : ?Address {
        return $this->address;
    }

    /**
     * Creates Address object
     *
     * @param Address $address
     */ 
    public function setAddress(Address $address) {
        $this->address = $address;
    }

    /**
     * Creates empty Address object
     */ 
    public function setEmptyAddress() {
        $this->address = new Address([]);
    }

    /**
     * Gets phoneNumber
     *
     * @return $phoneNumber
     */ 
    public function getPhoneNumber() {
        return $this->phoneNumber;
    }

    /**
     * Assigns value to phoneNumber property
     *
     * @param string $phoneNumber phone number for current Person object
     */ 
    public function setPhoneNumber($phoneNumber) {
        $this->phoneNumber = $phoneNumber;
    }

    /**
     * Gets email
     *
     * @return $email
     */ 
    public function getEmail() {
        return $this->email;
    }

    /**
     * Assigns value to email property
     *
     * @param string $email email for current Person object
     */ 
    public function setEmail($email) {
        $this->email = $email;
    }
	
    /**
     * Person constructor.
     *
     * @param array $person
     */
    public function __construct($person) {
    	foreach ($person as $key => $value) {
    		if($key !== 'address') {
                $this->{$key} = $value;
    		}
    	}
        $this->address = new Address($person['address']);
    }

    /**
     * Method to access private/protected properties of Person in json_encode function
     */
    public function jsonSerialize()
    {
        return 
        [
            'name' => $this->getName(),
            'age' => $this->getAge(),
            'address' => $this->getAddress(),
            'phoneNumber' => $this->getPhoneNumber(),
            'email' => $this->getEmail()
        ];
    }
}
?>
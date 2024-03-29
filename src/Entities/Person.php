<?php 
class Person implements JsonSerializable {
    /**
     * Identifier
     *
     * @var string
     */
    protected $id;

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
     * Position
     *
     * @var integer
     */
    protected $position;

    /**
     * Gets person id
     *
     * @return $id
     */ 
    public function getId() {
        return $this->id;
    }

    /**
     * Assigns value to person id
     *
     * @param string $id Person id
     */ 
    public function setId($id) {
        $this->id = $id;
    }

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
    public function getAddress() {
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
     * Gets position value
     *
     * @return $position
     */ 
    public function getPosition() {
        return $this->position;
    }

    /**
     * Assigns value to position property
     *
     * @param string $position position value
     */ 
    public function setPosition($position) {
        $this->position = (int)$position;
    }
	
    /**
     * Person constructor.
     *
     * @param array $person
     * @param Address $address
     */
    public function __construct($person, Address $address) {
    	foreach ($person as $key => $value) {
            $this->{$key} = $value;
    	}
        $this->address = $address;
    }

    /**
     * Method to access private/protected properties of Person in json_encode function
     */
    public function jsonSerialize()
    {
        return 
        [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'age' => $this->getAge(),
            'address' => $this->getAddress(),
            'phoneNumber' => $this->getPhoneNumber(),
            'email' => $this->getEmail(),
            'position' => $this->getPosition()
        ];
    }
}
?>

<?php 
class Address implements JsonSerializable {
    /**
     * Country name
     *
     * @var string
     */
	protected $country;

    /**
     * City name
     *
     * @var string
     */
	protected $city;

    /**
     * Street name
     *
     * @var string
     */
	protected $street;

    /**
     * House number value (allows something like "3A")
     *
     * @var string
     */
	protected $houseNumber;

    /**
     * Apartment number value (allows something like "1B")
     *
     * @var string
     */
	protected $apartmentNumber;

    /**
     * Gets country value
     *
     * @return $country
     */ 
    public function getCountry() {
        return $this->country;
    }

    /**
     * Assigns value to country property
     *
     * @param string $country country name for current address
     */ 
    public function setCountry($country) {
        $this->country = $country;
    }

    /**
     * Gets city value
     *
     * @return $city
     */ 
    public function getCity() {
        return $this->city;
    }

    /**
     * Assigns value to city property
     *
     * @param string $city city name for current address
     */ 
    public function setCity($city) {
        $this->city = $city;
    }

    /**
     * Gets street value
     *
     * @return $street
     */ 
    public function getStreet() {
        return $this->street;
    }

    /**
     * Assigns value to street property
     *
     * @param string $street street name for current address
     */ 
    public function setStreet($street) {
        $this->street = $street;
    }

    /**
     * Gets houseNumber value
     *
     * @return $houseNumber
     */ 
    public function getHouseNumber() {
        return $this->houseNumber;
    }

    /**
     * Assigns value to houseNumber property
     *
     * @param string $houseNumber house number name for current address
     */ 
    public function setHouseNumber($houseNumber) {
        $this->houseNumber = $houseNumber;
    }

    /**
     * Gets apartmentNumber value
     *
     * @return $apartmentNumber
     */ 
    public function getApartmentNumber() {
        return $this->apartmentNumber;
    }

    /**
     * Assigns value to apartmentNumber property
     *
     * @param string $apartmentNumber apartment number name for current address
     */ 
    public function setApartmentNumber($apartmentNumber) {
        $this->apartmentNumber = $apartmentNumber;
    }
	
    /**
     * Address constructor
     *
     * @param array $address array transformed in Address object
     */ 
    public function __construct($address = []) {
        if(!empty($address)) {
            foreach ($address as $key => $value) {
                $this->{$key} = $value;
            }
        }
        return $this;
    }

    /**
     * Method to access private/protected properties of Address in json_encode function
     */
    public function jsonSerialize()
    {
        return 
        [
            'country' => $this->getCountry(),
            'city' => $this->getCity(),
            'street' => $this->getStreet(),
            'houseNumber' => $this->getHouseNumber(),
            'apartmentNumber' => $this->getApartmentNumber()
        ];
    }
}
?>
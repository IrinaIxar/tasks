<?php

class Registers {
	public $data = [];

	function __construct($array = []){
		$this->data = $array;
	}

	public function getData(){
    	return $this->data;
    }

    public function getRegions($countryId){
    	$index = 0;
    	foreach ($this->data['regions'] as $region) {
    		if($region['countryId'] == $countryId){
	    		foreach ($region as $key => $value) {
    				$regions[$index][$key] = $value;
    			}
    			$index++;
    		}
    		
    	}
    	return $regions;
    }

    public function getCities($regionId){
    	$index = 0;
    	foreach ($this->data['cities'] as $city) {
    		if($city['regionId'] == $regionId){
    			foreach ($city as $key => $value) {
    				$cities[$index][$key] = $value;
    			}
    			$index++;
    		}
    	}
    	return $cities;
    }

    public function getCityInfo($cityId){
		foreach ($this->data['cities'] as $city) {
			if($city['id'] == $cityId){
				return $city;
			}
		}
    }
}
?>
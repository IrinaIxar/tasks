<?php

class Registers {
	public $data = [];

	function __construct($data=[]){
        //get data from json file
		$string = file_get_contents("registers.json");
		$this->data = json_decode($string, true);
	}

	public function getData(){
    	return $this->data;
    }

    //getting all countries
    public function getCountries(){
        foreach ($this->data['countries'] as $country) {
            $countries[] = ['id' => $country['id'], 'name' => $country['name']];
        }
    	return $countries;
    }

    //getting regions by countryId
    public function getRegions($countryId){
    	foreach ($this->data['regions'] as $region) {
    		if($region['countryId'] == $countryId){
    			$regions[] = ['id' => $region['id'], 'name' => $region['name']];
    		}
    	}
    	return $regions;
    }

    //getting cities by regionId
    public function getCities($regionId){
    	foreach ($this->data['cities'] as $city) {
    		if($city['regionId'] == $regionId){
    			$cities[] = ['id' => $city['id'], 'name' => $city['name']];
    		}
    	}
    	return $cities;
    }

    //getting city info by cityId
    public function getCityInfo($cityId){
		foreach ($this->data['cities'] as $city) {
			if($city['id'] == $cityId){
				return ['area' => $city['area'], 'population' => $city['population'], 'history' => $city['history']];
			}
		}
    }
}
?>
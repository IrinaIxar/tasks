<?php 
class Catalog{
	/**
     * Catalog
     *
     * @var array
     */
	protected $catalog;

	/**
     * Fields names that should be sort as integer values
     * used in $this->order() method
     *
     * @var array
     */
	protected $integerFields;

	/**
     * Gets catalog array of objects
     *
     * @return array $catalog
     */ 
	public function getCatalog() {
    	return $this->catalog;
    }
	
	/**
     * Catalog constructor
     *
     * @param array $catalog
     */ 
    public function __construct($catalog) {
        $this->catalog = $catalog;
    }

    /**
     * Sets integerFields property
     *
     * @param array $integerFields array of fields names
     */ 
    public function setIntegerFields($integerFields) {
    	$this->integerFields = $integerFields;
    }

    /**
     * Order catalog by integer field
     *
     * @param array $array catalog array of objects
     * @param string $field object field is sorted
     * @param string $nestedField should be determinated if field is mentionated early is object property
     * @param string $order asc/desc sort
     */ 
    public function sortObjectArrayByIntegerField(&$array,$field,$nestedField,$order = 'asc') {
    	$method = 'get'.ucfirst($field);
    	if($nestedField !== '') {
    		$nestedMethod = 'get'.ucfirst($nestedField);
    		usort($array,function ($a, $b) use(&$field,&$order,$method,$nestedMethod)
			{
				if($a->{$method}()->{$nestedMethod}() === $b->{$method}()->{$nestedMethod}()){return 0;}
				if($order === 'asc') return ($a->{$method}()->{$nestedMethod}() < $b->{$method}()->{$nestedMethod}()) ? -1 : 1;
				else return ($a->{$method}()->{$nestedMethod}() > $b->{$method}()->{$nestedMethod}()) ? -1 : 1;

			});
    	} else {
    		usort($array,function ($a, $b) use(&$field,&$order,$method)
			{
				if($a->{$method}() === $b->{$method}()){return 0;}
				if($order === 'asc') return ($a->{$method}() < $b->{$method}()) ? -1 : 1;
				else return ($a->{$method}() > $b->{$method}()) ? -1 : 1;

			});
    	}
	}

	/**
     * Order catalog by string field
     *
     * @param array $array catalog array of objects
     * @param string $field object field is sorted
     * @param string $nestedField should be determinated if field is mentionated early is object property
     * @param string $order asc/desc sort
     */ 
    public function sortObjectArrayByStringField(&$array,$field,$nestedField,$order = 'asc') {
    	$method = 'get'.ucfirst($field);
    	if($nestedField !== '') {
    		$nestedMethod = 'get'.ucfirst($nestedField);
			usort($array,function ($a, $b) use(&$field,&$order,$method,$nestedMethod)
			{
				if($order === 'asc') return strcmp($a->{$method}()->{$nestedMethod}(), $b->{$method}()->{$nestedMethod}());
				else return strcmp($b->{$method}()->{$nestedMethod}(), $a->{$method}()->{$nestedMethod}());
			});
    	} else {
    		usort($array,function ($a, $b) use(&$field,&$order,$method)
			{
				if($order === 'asc') return strcmp($a->{$method}(), $b->{$method}());
				else return strcmp($b->{$method}(), $a->{$method}());
			});
    	}
	}

	/**
     * Order catalog by field
     *
     * @param string $field object field is sorted
     * @param string $nestedField should be determinated if field is mentionated early is object property
     * @param string $order asc/desc sort
     */ 
    public function order($field, $nestedField = '', $order='asc') {
    	if(in_array($field, $this->integerFields)) {
    		$this->sortObjectArrayByIntegerField($this->catalog,$field,$nestedField,$order);
    	} else {
    		$this->sortObjectArrayByStringField($this->catalog,$field,$nestedField,$order);
    	}
	}

    /**
     * Removes item from catalog by key
     *
     * @param integer $index index in catalog array
     */ 
    public function removeByIndex($index) {
        unset($this->catalog[($index-1)]); 
        //reindex
        $this->catalog = array_values($this->catalog);
    }

    /**
     * Removes items in catalog by field if it's values are numeric values
     *
     * @param string $field object field by which a removed items
     * @param string $nestedField should be determinated if field is mentionated early is object property
     * @param string $min min value 
     * @param string $max max value 
     * @param string $isEmpty is empty value true/false
     */ 
    public function removeByIntegerField($field, $nestedField='', $min='', $max='', $isEmpty='') {
        if($isEmpty === 'true'){
            foreach ($this->catalog as $key => $item) {
                $value = ($nestedField === '') ? $item->{'get'.ucfirst($field)}() : $item->{'get'.ucfirst($field)}()->{'get'.ucfirst($nestedField)}();
                if($value === '') {
                    unset($this->catalog[$key]); 
                }
            }
        } else {
            foreach ($this->catalog as $key => $item) {
                $value = ($nestedField === '') ? $item->{'get'.ucfirst($field)}() : $item->{'get'.ucfirst($field)}()->{'get'.ucfirst($nestedField)}();
                $value = (int)$value; //for fields like house and apartment numbers, that may content characters like '3A'
                if(($min !== '' && $max !== '' && ($value <= (int)$max) && ((int)$min <= $value)) || 
                    ($min === '' && ($value <= (int)$max)) ||
                    ($max === '' && ((int)$min <= $value))) {
                    unset($this->catalog[$key]); 
                }
            }
        } 
        //reindex
        $this->catalog = array_values($this->catalog);       
    }

    /**
     * Removes items in catalog by field if it's values are string values
     *
     * @param string $field object field by which a removed items
     * @param string $nestedField should be determinated if field is mentionated early is object property
     * @param string $value sought value
     * @param string $isStrict strict comparison true/false
     * @param string $isEmpty is empty value true/false
     */ 
    public function removeByStringField($field, $nestedField='', $value='', $isStrict='', $isEmpty='') {
        if($isEmpty === 'true' || $isStrict === 'true'){
            $checkValue = ($isEmpty === 'true') ? '' : $value;
            foreach ($this->catalog as $key => $item) {
                $currentValue = ($nestedField === '') ? $item->{'get'.ucfirst($field)}() : $item->{'get'.ucfirst($field)}()->{'get'.ucfirst($nestedField)}();
                if($currentValue === $checkValue) {
                    unset($this->catalog[$key]); 
                }
            }
        } else {
            foreach ($this->catalog as $key => $item) {
                $currentValue = ($nestedField === '') ? $item->{'get'.ucfirst($field)}() : $item->{'get'.ucfirst($field)}()->{'get'.ucfirst($nestedField)}();
                if(strpos($currentValue,$value) !== false) {
                    unset($this->catalog[$key]); 
                }
            }
        }  
        //reindex
        $this->catalog = array_values($this->catalog);      
    }

    /**
     * Sets item to needed position
     *
     * @param string $field Object identifier
     * @param string $value value of Object identifier
     * @param integer $index new position for created item
     */ 
    public function setNewPosition($index, $field='', $value='') {
        if($field !== '' && $value !== ''){
            foreach ($this->catalog as $key => $item) {
                if($item->{'get'.ucfirst($field)}() === $value){
                    $currentIndex = $key;
                }
            }
        } else { //change position for last added
            $currentIndex = count($this->catalog)-1;
        }     

        $item = array_splice($this->catalog, $currentIndex, 1);
        array_splice($this->catalog, $index, 0, $item);
    }
}
?>
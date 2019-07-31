e<?php 
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
     * @param string $order ASC/DESC sort
     */ 
    public function sortObjectArrayByIntegerField(&$array,$field,$nestedField,$order = true) {
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
     * @param string $order ASC/DESC sort
     */ 
    public function sortObjectArrayByStringField(&$array,$field,$nestedField,$order = true) {
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
     * @param string $order ASC/DESC sort
     */ 
    public function order($field, $nestedField = '', $order='asc') {
    	if(in_array($field, $this->integerFields)) {
    		$this->sortObjectArrayByIntegerField($this->catalog,$field,$nestedField,$order);
    	} else {
    		$this->sortObjectArrayByStringField($this->catalog,$field,$nestedField,$order);
    	}
	}
}
?>
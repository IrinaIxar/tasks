<?php
class Product implements JsonSerializable
{
    protected $id;
    protected $name;
    protected $price;
    protected $category;
    protected $count;
    protected $deleted=0;

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        if(isset($name) && $name === '') {
            $name = NULL;
        } 
        $this->name = $name;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function getCategory()
    {
        return $this->category;
    }

    public function setCategory($category)
    {
        $this->category = $category;
    }

    public function getCount()
    {
        return $this->count;
    }

    public function setCount($count)
    {
        $this->count = $count;
    }

    public function getDeleted()
    {
        return $this->deleted;
    }

    public function setDeleted($deleted=0)
    {
        $this->deleted = $deleted;
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
            'price' => $this->getPrice(),
            'category' => $this->getCategory(),
            'count' => $this->getCount(),
            'deleted' => $this->getDeleted()
        ];
    }
}
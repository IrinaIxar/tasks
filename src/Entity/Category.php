<?php
// src/Entity/Category.php
class Category implements JsonSerializable
{
    protected $id;
    protected $name;
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

    public function getDeleted()
    {
        return $this->deleted;
    }

    public function setDeleted($deleted=0)
    {
        $this->deleted = $deleted;
    }

    /**
     * Method to access private/protected properties of Category in json_encode function
     */
    public function jsonSerialize()
    {
        return 
        [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'deleted' => $this->getDeleted()
        ];
    }
}
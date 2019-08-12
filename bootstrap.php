<?php
// bootstrap.php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once "vendor/autoload.php";
require "config/config.php";

$configDB = $config['db'];

// Create a simple "default" Doctrine ORM configuration
$isDevMode = true;
$config = Setup::createXMLMetadataConfiguration(array(__DIR__."/config/xml"), $isDevMode, null, null, false);

// database configuration parameters
$conn = array(
    'driver'   => 'pdo_mysql',
    'host'     => $configDB['host'],
    'user'     => $configDB['user'],
    'password' => $configDB['password'],
    'dbname'   => $configDB['name'],
    'charset'  => 'UTF8',
);

// obtaining the entity manager
$entityManager = EntityManager::create($conn, $config);
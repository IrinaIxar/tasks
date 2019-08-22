<?php
require_once '../vendor/autoload.php';
require '../config/consts.php';
require '../src/Router.php';
require '../src/Kernel.php';
require_once '../src/Controllers/Controller.php';

$router = new Router();
$kernel = new Kernel($router);
?>

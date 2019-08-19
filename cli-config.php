<?php
// cli-config.php
require_once "src/Entity/EM.php";

$em = EM::getInstance();

return \Doctrine\ORM\Tools\Console\ConsoleRunner::createHelperSet($em);
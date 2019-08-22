<?php
require 'Exceptions/RouteException.php';

class Kernel {
    public function __construct (Router $router) {
        list($controllerName, $methodName, $params) = $router->resolve();
        echo $this->handle($controllerName, $methodName, $params);
    }
    
    public function handle($controllerName='', $methodName='', $params=[]) {
        //if no controller require base controller and call renderLayout() method 
        $controllerName = $controllerName !== '' && !empty($controllerName) ? ucfirst($controllerName):'';

        //if no such Controller
        try {
            if(!file_exists(ROOTPATH.DIRECTORY_SEPARATOR.'src/Controllers'.DIRECTORY_SEPARATOR.$controllerName.'Controller.php')) {
                throw new RouteException();
            }
            require_once ROOTPATH.DIRECTORY_SEPARATOR.'src/Controllers'.DIRECTORY_SEPARATOR.$controllerName.'Controller.php';
            $controllerName = ucfirst($controllerName).'Controller';

            try {
                //if no Class in Controller
                if(!class_exists($controllerName)) {
                    throw new RouteException();
                }
                $controller = new $controllerName;
                $methodName = empty($methodName) ? 'renderLayout' : $methodName;
                try {
                    //if no method in mentionated controller
                    if(!method_exists($controller,$methodName)) {
                        throw new RouteException();
                    }
                    return call_user_func_array(array($controller, $methodName), $params); //can be different count of params, that's why we use call_user_func_array()
                } catch(RouteException $exception) {
                    $exception->getErrorMessage();
                }
                
            } catch (RouteException $exception) {
                $exception->getErrorMessage();
            }
        } catch (RouteException $exception) {
            $exception->getErrorMessage();
        }
    }
}
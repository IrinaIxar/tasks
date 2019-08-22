<?php
class Router {
    public function resolve () {
        if(($pos = strpos($_SERVER['REQUEST_URI'], '?')) !== false){
            $route = substr($_SERVER['REQUEST_URI'], 0, $pos);
            $params = substr($_SERVER['REQUEST_URI'], ($pos + 1));
            $params = explode('&', $params);
            foreach ($params as $param) {
                $param = explode('=', $param);
                $paramsList[$param[0]] = $param[1];
            }
        }
        $route = is_null($route) ? $_SERVER['REQUEST_URI'] : $route;
        $route = explode('/', $route);
        array_shift($route);
        $result[0] = array_shift($route);
        $result[1] = array_shift($route);
        $result[2] = isset($paramsList) ? $paramsList : $route;

        return $result;
    }
}
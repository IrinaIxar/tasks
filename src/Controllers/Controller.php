<?php
class Controller {    
    public function renderLayout ($params=[]) {
        extract($params);
        ob_start();
        require ROOTPATH.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'Views'.DIRECTORY_SEPARATOR.'Layout'.DIRECTORY_SEPARATOR."layout.html";
        return ob_get_clean();        
    }
    
    public function render ($viewName='', array $params = [], $hasNavigation = '') {
        $viewFile = ROOTPATH.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'Views'.DIRECTORY_SEPARATOR.$viewName;
        extract($params);
        ob_start();
        require $viewFile;
        $body = ob_get_clean();
        ob_end_clean();
        return $this->renderLayout(['body' => $body, 'hasNavigation' => $hasNavigation]);        
    }    
}
<?php

define('BASE_URL', '//'.$_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] . dirname($_SERVER['PHP_SELF']).'/');

$action = 'home'; // accion por defecto
if (!empty( $_GET['action'])) {
    $action = $_GET['action'];
}


// parsea la accion para separar accion real de parametros
$params = explode('/', $action);

switch ($params[0]) {
    case 'home':
        require_once "home.html";
        break;
    case 'login':
        require_once "login.html";
        break;
    case 'register':
        require_once "register.html";
        break;

    
    default: 
        echo "<p>404 Page Not Found</p> <a href='home'>Home</a>";
        break;
}

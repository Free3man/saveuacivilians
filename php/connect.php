<?
    require_once("enums.php");
    $connection = mysqli_connect("127.0.0.1", "root", "", "saveuacivilsdb");
    if ($connection == false){
        echo json_encode(Errors::$connetionFailed);
        exit();
    }
    else 
    {
        mysqli_set_charset($connection, "utf8");
    }
?>
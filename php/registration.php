<?php
    require_once("connect.php");
    $users = mysqli_query($connection, "SELECT email FROM `users`");
    $emailFound = false;
    while (($line = mysqli_fetch_assoc($users))) {
        if ($line["email"] == $_POST["email"]){
            $emailFound = true;
            echo "exist";
            break;
        }
    }
    if (!$emailFound) {
        
    }
?>
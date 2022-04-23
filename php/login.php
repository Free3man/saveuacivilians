<?php
    require_once("connect.php");
    $users = mysqli_query($connection, "SELECT * FROM `users`");
    while (($line = mysqli_fetch_assoc($users))) {
        if ($line["E-Mail"] == $_POST["email"]){
            if ($line["Password"] == $_POST["password"]){
                echo json_encode($line);
            }
            else {
                echo 0;
            }
        }
        else {
            echo false;
        }
    }
?>
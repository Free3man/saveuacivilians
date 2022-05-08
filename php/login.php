<?
    require_once("connect.php");
    $users = mysqli_query($connection, "SELECT * FROM `users`");
    while (($line = mysqli_fetch_assoc($users))) {
        if ($line["email"] == $_POST["email"]){
            if ($line["password"] == $_POST["password"]){
                echo json_encode($line);
            }
            else {
                echo json_encode(Responses::$wrongPassword);
            }
        }
        else {
            echo json_encode(Responses::$emailNotFound);
        }
    }
?>
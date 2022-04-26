<?
    require_once("connect.php");
    $users = mysqli_query($connection, "SELECT email FROM `users`");
    $emailFound = false;
    while (($line = mysqli_fetch_assoc($users))) {
        if ($line["email"] == $_POST["email"]){
            $emailFound = true;
            echo json_encode(Errors::$emailExist);
            break;
        }
    }
    if (!$emailFound) {
        $sql = "INSERT INTO users (, `email`, `password`, `name`, `phoneNumber`) VALUES (1, 1, 1, 1)";
        mysqli_query($connection, $sql);
    }
?>
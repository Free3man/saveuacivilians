<?
    require_once("connect.php");
    $postData = file_get_contents('php://input');
    $post = json_decode($postData, true);
    echo $post["email"];



    $users = mysqli_query($connection, "SELECT email FROM `users`");
    $emailFound = false;
    while (($line = mysqli_fetch_assoc($users))) {
        if ($line["email"] == $_POST["email"]){
            $emailFound = true;
            echo json_encode(Responses::$emailExist);
            break;
        }
    }
    if (!$emailFound) {
        $sql = "INSERT INTO users (`email`, `password`, `name`, `phoneNumber`)
        VALUES ('{$_POST["email"]}', '{$_POST["password"]}', '{$_POST["name"]}', '{$_POST["phoneNumber"]}')";
        mysqli_query($connection, $sql);
        var_dump($_POST);
        echo json_encode(Responses::$success);
    }
?>
<?
    function findData($db, $key, $value){
        $data = mysqli_query($db, "SELECT * FROM `users`");
        while ($line = mysqli_fetch_assoc($data)) {
            if($line["email"] == $value){
                return $line;
            }
        }
        return false;
    }
    require_once("connect.php");
    $postData = file_get_contents('php://input');
    $post = json_decode($postData, true);
    if (findData($connection, "email", $post["email"])) {
        echo json_encode(Responses::$emailExist);
    }
    else {
        $sql = "INSERT INTO users (`email`, `password`, `name`, `phoneNumber`)
        VALUES ('{$post["email"]}', '{$post["password"]}', '{$post["name"]}', '{$post["phoneNumber"]}')";
        if ($sql){
            mysqli_query($connection, $sql);
            echo json_encode(findData($connection, "email", $post["email"]));
        }
        else
        {
            echo json_encode(Responses::$failure);
        }
    }
?>
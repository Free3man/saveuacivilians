<?
    require_once("connect.php");
    $geojsons = mysqli_query($connection, "SELECT * FROM `geojson`");
    $postData = file_get_contents('php://input');
    $post = json_decode($postData, true);
    $alreadyExists = false, $success = true;
    while ($line = mysqli_fetch_assoc($geojsons)) {
        for ($i=0; $i < count($post); $i++) { 
            if($line["title"] == $post[$i]["title"] and
            $line["x"] == $post[$i]["x"] and
            $line["y"] == $post[$i]["y"]) {
                $alreadyExists = true;
                break;
            }
        }
        if (!$alreadyExists){
            $success = $success and mysqli_query($connection, "INSERT INTO geojson (`title`, `x`, `y`) VALUES ('{$post["title"]}', '{$post["x"]}', '{$post["y"]}')")
        }
    }
    if($success){
        echo json_encode(Responses::$success);
    }
    else{
        echo json_encode(Responses::$failure);
    }
?>
<?php
    require_once("connect.php");
    $geojsons = mysqli_query($connection, "SELECT * FROM `geojson`");
    $postData = file_get_contents('php://input');
    $post = json_decode($postData, true);
    $alreadyExists = false;
    while ($line = mysqli_fetch_assoc($geojsons)) {
        for ($i=0; $i < mysqli_num_rows($post); $i++) { 
            if($line["title"] == $post[$i]["title"] and
            $line["x"] == $post[$i]["x"] and
            $line["y"] == $post[$i]["y"]) {
                $alreadyExists = true;
                break;
            }
        }
        if (!$alreadyExists){
            
        }
    }
?>
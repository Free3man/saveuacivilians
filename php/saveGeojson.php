<?php
    require_once("connect.php");
    $geojsons = mysqli_query($connection, "SELECT * FROM `geojson`");
    $postData = file_get_contents('php://input');
    $post = json_decode($postData, true);
    while ($line = mysqli_fetch_assoc($geojsons)) {
        for ($i=0; $i < mysqli_num_rows(); $i++) { 
            
        }
    }
?>
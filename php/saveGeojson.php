<?php
    require_once("connect.php");
    $geojsons = mysqli_query($connection, "SELECT * FROM `geojson`");
    while ($line = mysqli_fetch_assoc($geojsons)) {
        for ($i=0; $i < mysqli_num_rows(); $i++) { 
            # code...
        }
    }
?>
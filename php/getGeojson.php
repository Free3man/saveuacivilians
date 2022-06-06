<?
    require("connect.php");
    $geojsons = mysqli_query($connection, "SELECT * FROM `geojson`");
    $data = [];
    while($geojson = mysqli_fetch_assoc($geojsons)){
        $data[] = json_encode($geojson);
    }
    echo json_encode(['array' => $data]);
?>
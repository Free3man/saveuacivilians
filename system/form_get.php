<?php
$connect = mysqli_connect("localhost", "root", "root", "saveuacivils");
$result = mysqli_query($connect, "SELECT `id_request`, `types_of_work`, `adress_coordinates` FROM `volunteering_task`");
$data = [];
while($row = mysqli_fetch_assoc($result)){
    $data[] = json_encode($row);
}
echo json_encode(['array' => $data]);
?>
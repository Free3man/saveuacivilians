<?php
    $connect = mysqli_connect("localhost", "root", "root", "saveuacivils");
    $data = json_decode(file_get_contents('php://input'), true);
    $result = mysqli_query($connect, "SELECT * FROM `volunteering_task` WHERE `id_request` = $data");
    $row = mysqli_fetch_assoc($result);
    echo json_encode($row);
?>
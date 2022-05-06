<?
    require_once("connect.php");
    $markers = mysqli_query($connection, "SELECT * FROM `markers`");
    echo $markers;
?>
<?php
    $servername = "localhost";
    $username = "";
    $password = "";
    $database = "";

    $conn = mysqli($servername, $username, $password, $database);
    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }
?>
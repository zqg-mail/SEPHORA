<?php

$one = $_GET['one'];
$link = mysqli_connect('gwww','root','root','item');

$sql = "SELECT * FROM `one`";

$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

echo json_encode(array(
    "message" => "请求一级列表",
    "code" => 1,
    "cat_one_list" => $data
));




?>
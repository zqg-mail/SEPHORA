<?php

$username = $_POST['username'];
$password = $_POST['password'];

$link = mysqli_connect('gwww','root','root','bk2004');
$sql = "SELECT * FROM `users` WHERE `username`='$username' AND `password`='$password'";

$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

if(count($data)){
    echo json_encode(array(
        "message" => "登陆成功",
        "code" => 1,
        "nickname" => $data[0]['nickname']
    ));
}else{
    echo json_encode(array(
        "message" => "用户密码错误",
        "code" => 0
    ));
}
?>
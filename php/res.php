<?php
// header("Access-Control-Allow-Origin:*");
// header("Access-Control-Allow-Method:*");
include_once './config.php';

$userName = $_POST['userName'];
$userPwd = $_POST['userPwd'];

$link = mysqli_connect('gwww','root','root','bk2004');

$sql = "INSERT INTO `users`(`username` , `password`) VALUES('{$userName}' , '{$userPwd}')";

$result = mysqli_query($link, $sql);

// // 写入成功,执行结果是true,写入失败是false
if($result == true){
    echo json_encode(["result"=>1,"msg"=>"注册成功"]);
}else{
    echo json_encode(["result"=>0,"msg"=>"注册失败"]);
}
function setVc() {
    var str = '0123456789abcdefghijklmnopqrestuvwxyzABCDEFGHIJKLMNOPQRESTUVWXYZ';
    var vc = '';
    while (vc.length !== 6) {
        var num = parseInt(Math.random() * str.length);
        if (vc.indexOf(str[num]) === -1) {
            vc += str[num];
        }
    }
    return vc;
}
$('#vc').html(setVc()).click(function() {
    console.log(111);
    $(this).html(setVc());
});
$('button').click(() => {
    let name = $('[name="name"]').val();
    let pwd1 = $('[name="pwd1"]').val();
    let pwd2 = $('[name="pwd2"]').val();
    let vc1 = $('[name="vc"]').val();
    let vc2 = $('#vc').html();
    console.log(pwd1);
    console.log(pwd2);

    // 判断两次密码是否相同
    if (pwd1 !== pwd2) {
        $('[name="pwd1Span"]').html('两次密码不同');
        return false;
    } else {
        $('[name="pwd1Span"]').html('');
    }

    //判断验证码是否正确
    if (vc1.toUpperCase() !== vc2.toUpperCase()) {
        $('[name="vcSpan"]').html('验证码错误');
        // 通过return 之中其他程序的执行
        return false;
    } else {
        $('[name="vcSpan"]').html('');
    }

    $.ajax({
        url: './php/res.php',
        type: 'post',
        data: {
            userName: name,
            userPwd: pwd1
        },
        dataType: 'json',
        success: (res) => {
            console.log(res);
            if (res.result === 1) {
                window.alert('恭喜您,注册成功,点击确定,跳转首页');
                window.location.href = './index.html';
            } else {
                window.alert('恭喜您,注册不成功,用户名重复,点击确定,继续玩命注册');
                console.log(111);

            }
        }
    })

    // $.post('./php/res.php',{userName:name,userPwd:pwd1},null,'json').then(res =>{
    //     console.log(11);
    // })
})

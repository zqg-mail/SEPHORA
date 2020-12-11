$(function(){
    $('#username').on('focus',function(){
        $('.errorRedIcon').addClass('hide')
        $('.errorFont').addClass('hide')
    })
    $('#username').on('input',()=>{
        console.log($('#username')[0]['value'].length);
    })
    $('#password').on('focus',function(){
        $('.errorRedIcon').addClass('hide')
        $('.errorFont').addClass('hide')
    })
    if($('.userAgreeCheck').on('click',()=>{
        if($('.userAgreeCheck')[0]['checked'] === true){
            console.log(111);
            $('.userAgreeCheck')[0]['checked'] === false
        }else{
            console.log(3333);
            $('.userAgreeCheck')[0]['checked'] === true
        }
        console.log($('.userAgreeCheck')[0]['checked']=== true);
    }))
    
    if($('#username')[0]['value'].length>5 || $('#password')[0]['value'].length>6 || $('.userAgreeCheck')[0]['checked']=== true){
        console.log(777);
        $('.btn-success').removeAttr('disabled')
    }
    $("#login").validate({

        rules:{
            username:{
                required:true,
                minlength:5,
                maxlength:10
            },
            password:{
                required:true,
                minlength:6,
                maxlength:12
            }
        },
        messages:{
            username:{
                required:'请填写用户信息',
                minlength:'最少5个字符',
                maxlength:'最多10个字符'
            }
        },
        submitHandler(form){
            const info = $(form).serialize()
            console.log(info);
            $.post('./php/login.php',info,null,'json').then(res =>{
                console.log(res);

                if(res.code === 0){
                    console.log(222);
                    $('.errorRedIcon').removeClass('hide')
                    $('.errorFont').removeClass('hide')
                }else{
                    setCookie('nickname',res.nickname)
                    window.location.href = './index.html';
                    
                }
            })
        }
    })

})
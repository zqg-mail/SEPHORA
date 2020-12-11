$(function(){
    $('.carousel-multiple-fade ul').slider({
        imgList: [
            {
                img: './img/index/1.jpg',
                a: '#',
            },
            {
                img: './img/index/2.jpg',
                a: '#',
            },
            {
                img: './img/index/3.jpg',
                a: '#',
            }
        ], //图片的列表
        width: 1190, //图片的宽
        height: 400, //图片的高
        isAuto: true, //是否自动轮播
        moveTime: 2000, //运动时间
        direction: 'right', //轮播的方向
        btnWidth: 30, //按钮的宽
        btnHeight: 60, //按钮的高
        spanWidth: 100, //span按钮的宽
        spanHeight: 3, //span按钮的高
        spanColor: 'rgba(0, 0, 0, 0.3)', //span按钮的颜色
        activeSpanColor: '#fff', //选中的span颜色
        btnBackgroundColor: 'rgba(0, 0, 0, 0.3)', //两侧按钮的颜色
        // spanRadius: '50%', //span按钮的圆角程度
        spanMargin: 3, //span之间的距离
    })

    let list = null
    const list_info = {
        one:'all',
        one_one:'all',
        one_two:'all',

    }

    getCateOne()
    async function getCateOne(){
        const one_list = await $.get('./php/indexOne.php',null,null,'json')
        let str = ''
        console.log(one_list);
        console.log(one_list.cat_one_list[0].o_o);
        for(let i = 0; i < one_list.cat_one_list.length;i++){

                // console.log(one_list.cat_one_list[i].o);
                // console.log(item);
                str += `<li class="">
                            <span class=""></span>
                            <a href="javascript:;" target="" class="title">${one_list.cat_one_list[i].o}</a>
                        <ul    class="navigation-info-content-menu-list-content">
                            <li class=""><a target="_blank">${one_list.cat_one_list[i].o_o}</a></li>
                            <li class="last"><a target="_blank">${one_list.cat_one_list[i].o_t}</a></li>
                        </ul>
                        </li>
                `
        }

        $('.navigation-info-content-menu-Col').html(str)

        $('.navigation-info-content-menu-Col li').hover(
            function(){
                $(this).addClass('active'),
                $('.navigation-info-content-menu-Col li>span').addClass('active-style'),
                $('.navigation-info-content-hover').addClass('active')
            },
            function(){
                $(this).removeClass('active'),
                $('.navigation-info-content-menu-Col li>span').removeClass('active-style'),
                $('.navigation-info-content-hover').removeClass('active')
            }
        )
    }
    $('.listye').on('click',function(){
        window.location.href = './list.html'
    })

    const nickname = getCookie('nickname')
    console.log(nickname);
    if(nickname){
        console.log(111);
        $('.top-content-left .haha').addClass('hide')
        $('.hehe').removeClass('hide').text(`欢迎您: ${nickname}`)
    }else {
        // 表示不存在, 是 undefined
        $('.top-content-left .haha').removeClass('hide')
        $('.hehe').addClass('hide')
    }
})

const ul = document.querySelector('.module-search-focus')

const inp = document.querySelector('.module-search-main input')

inp.onclick = function(){
    ul.classList.add('active')
}

inp.addEventListener('input',function(){
    const value = this.value.trim()
    if(!value) return

    const script = document.createElement('script')
    const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
    script.src = url
    document.body.appendChild(script)

    script.remove()
})

function bindHtml(res){
    console.log(res);
    if(!res.g){
        ul.classList.remove('active')
        return
    }

    let str = ''
    for(let i = 0;i < res.g.length;i++){
        str += `
            <li>${res.g[i].q}</li>
        `
    }

    ul.innerHTML = str
    ul.classList.add('active')

}

getGoodList()
async function getGoodList(){
    const goodsList = await $.get('./php/index.php',)
}

const  ftop = document.querySelector('#FixedTop.active')
    console.log(ftop)
 window.onscroll = function(){

    let height =  document.documentElement.scrollTop
    // console.log(height)
    if(height >  720){
         ftop.style.display = 'block'
    }
    if(height <=520)
    ftop.style.display = 'none'
 }


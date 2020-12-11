/*
  请求单一一条商品的所有信息, 按照 html 格式渲染

  问题: 请求哪一条商品的信息 ?
    + 在列表页点击哪一个 商品, 就是哪一个商品的信息
    + 点击事件发生在 list.html 页面, 请求商品详情信息发生在 detail.html 页面
    + 点击商品的时候, 把商品 id 存储在 cookie 里面
    + 在详情页拿到商品 id, 根据 id 去请求这一条商品

  问题: 如何跨页面进行通讯 ?
    + 登录的时候, 在 login.html 得到的用户昵称信息
    + 使用的时候, 在 index.html 使用的用户昵称信息
*/

/*
  加入购物车的事件
    + 只要我组装出一个数组来
    + 存储到 lcoalStorage 里面
    + 将来在 cart.html 页面把这个数组拿出来

  4. 当你点击 加入购物车的时候
    + 向数组里面组装的过程
    4-1. 事件绑定给谁 ?
      => 因为 addCart 是渲染的, 所以绑定给 goodsInfo 进行事件委托
    4-2. 拿到 localStorage 里面有没有购物车数组
    4-3. 确定数组中有没有这个数据
      => 当我两次加入同一个数据的时候, 要判断一下原先有没有这个数据
    4-4. 将数据再次存储到 localStorage 中

  5. 操作 加 减 按钮, 让 input 里面的数字 ++ 或者 --
    5-1. 事件委托, 委托给 goodsInfo
*/

// jQuery 的入口函数
$(function () {

  // 0. 提前准备一个变量拿出来商品信息
  let info = null

  // 1. 拿到 cookie 中的 goods_id 属性
  const id = getCookie('goods_id')

  // 2. 根据 id 信息去请求商品数据
  getGoodsInfo()
  async function getGoodsInfo() {
    const goodsInfo = await $.get('./server/getGoodsInfo.php', { goods_id: id }, null, 'json')

    // 3. 进行页面的渲染
    bindHtml(goodsInfo.info)

    // 给提前准备好的变量进行赋值
    info = goodsInfo.info
  }

  function bindHtml(info) {
    console.log(info)

    // 1. 渲染左边放大镜位置
    $('.enlargeBox').html(`
      <div class="show">
        <img src="${ info.goods_big_logo }" alt="">
      </div>
      <div class="list">
        <p class="active">
          <img src="${ info.goods_small_logo }" alt="">
        </p>
      </div>
    `)

    // 2. 商品详细信息渲染
    $('.goodsInfo').html(`
      <p class="desc">${ info.goods_name }</p>
      <div class="btn-group size">
        <button type="button" class="btn btn-default">S</button>
        <button type="button" class="btn btn-default">M</button>
        <button type="button" class="btn btn-default">L</button>
        <button type="button" class="btn btn-default">XL</button>
      </div>
      <p class="price">
        ￥ <span class="text-danger">${ info.goods_price }</span>
      </p>
      <div class="num">
        <button class="subNum">-</button>
        <input type="text" value="1" class="cartNum">
        <button class="addNum">+</button>
      </div>
      <div>
        <button class="btn btn-success addCart">加入购物车</button>
        <button class="btn btn-warning continue"><a href="./list.html">继续去购物</a></button>
      </div>
    `)

    // 3. 商品参数渲染
    $('.goodsDesc').html(info.goods_introduce)
  }

  // 4. 加入购物车的操作
  $('.goodsInfo').on('click', '.addCart', function () {
    // 4-2. 拿到 localStorage 里面有没有数组
    // 如果你没有这个数组, 那么我就定义一个空数组
    // 如果你有, 我就用你的
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []

    // 4-3. 判断一下 cart 数组里面有没有这个数据
    // 问题: 当前是哪一条数据 ? id
    // 如果 cart 里面有某一条数据和我的 id 一样
    // 表示我不需要添加内容了, 而是 ++
    // 如果 cart 里面没有某一条数据, 那么我要把当前这条数据 push 进去
    // 当前这一条数据是哪一条 ? info 存储进去
    // 如何判断 cart 中有没有 id 一样的数据
    // some 方法
    const flag = cart.some(item => item.goods_id === id)
    // 如果没有, 那么我就 push 进去
    if (flag) {
      // cart 里面 id 一样的这一条里面的 cart_number ++
      // 4-4. 如果有这个数据拿到这个信息
      // filter 方法返回的是一个数组
      const cart_goods = cart.filter(item => item.goods_id === id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
    } else {
      info.cart_number = 1
      // 表示没有
      cart.push(info)
    }

    // 4-5. 添加完毕还要存储到 localStorage 里面
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  // 5. ++ -- 的事件
  $('.goodsInfo')
    .on('click', '.subNum', function () {
      // 拿到 input 的 value 值
      let num = $('.cartNum').val() - 0
      // 进行判断, 如果当前是 1, 那么什么都不做
      if (num === 1) return
      // 否则就进行 -- 操作, 然后在设置回去
      $('.cartNum').val(num - 1)
    })
    .on('click', '.addNum', function () {
      // 拿到 input 的 value 值
      let num = $('.cartNum').val() - 0
      // 否则就进行 -- 操作, 然后在设置回去
      $('.cartNum').val(num + 1)
    })
})

// const id = 15
// var arr = [
//   { goods_id: 13 },
//   { goods_id: 14 },
//   { goods_id: 15 },
//   { goods_id: 16 },
//   { goods_id: 17 }
// ]
// 判断数组里面有没有 goods_id 为 17 的
// const flag = arr.some(item => item.goods_id === id)
// // 从数组里面筛选出来满足条件的项
// const info = arr.filter(item => item.goods_id === id)[0]
// console.log(info)
// console.log(flag)



// 一个商品
// var info = { goods_id: 13 }

// const arr = [
//   { goods_id: 13, num: 1 },
//   { goods_id: 15, num: 1 },
//   { goods_id: 16, num: 1 },
//   { goods_id: 17, num: 1 }
// ]

// 需求: 把 info 按照合理的方式加入到 arr 里面
// // 1. 判断 arr 里面是不是有 goods_id === 13 的
// const flag = arr.some(item => item.goods_id === info.goods_id)

// if (flag) {
//   // 拿到 arr 里面 goods_id 为 13 的哪一条
//   // { goods_id: 13 }
//   const info = arr.filter(item => item.goods_id === info.goods_id)[0]
//   info.num++

// } else {
//   info.num = 1
//   arr.push(info)
// }

<template>
    <div id="float_left">
        <ul>
            <li class="li1">
                <div class="container">
                    <a href="../shopping/cart" target="_blank">
                        <div class="nav flex-column justify-content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                                 class="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                        </div>
                        <div style="font-size: 2px" class="nav flex-column justify-content-center text-center">
                            购物车
                        </div>
                    </a>
                </div>
            </li>
            <li class="li2">
                <div class="container">
                    <a href="../user/self" target="_blank">
                        <div class="nav flex-column justify-content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                                 class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg>
                        </div>
                        <div style="font-size: 2px" class="nav flex-column justify-content-center text-center">
                            个人中心
                        </div>
                    </a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>

</script>
<style scoped>
#float_left {
    width: 100px;
    height: 500px;
    position: fixed;
    top: 30%;
    right: 100px;
}

#float_left ul li {
    list-style: none;
    width: 80px;
    height: 80px;
    background-repeat: no-repeat;
    border-bottom: 1px solid white;
    cursor: pointer;
    transition: all 0.5s ease;
    background-color: #f1f1f1;
    text-orientation: mixed;
}

#float_left .li1 {
    background-position: 0px -209px;
}

#float_left .li2 {
    background-position: -42px -168px;
}

#float_left .li3 {
    background-position: 0px -126px;
}

#float_left .div1 {
    width: 0px;
    height: 40px;
    background-color: #bdbdbd;
    margin-left: 40px;
    overflow: hidden;
    color: white;
    text-align: center;
    line-height: 40px;
}

#float_left .li1:hover {
    background-position: 0px -168px;
}

#float_left .li2:hover {
    background-position: -42px -126px;
}

#float_left .li3:hover {
    background-position: 0px -84px;
}

#float_left li:hover .div1 {
    width: 80px;
}
</style>
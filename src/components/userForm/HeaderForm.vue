<template>
    <nav class="navbar navbar-expand-lg border-bottom py-3 mb-4">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">网上书店</a>
            <div class="col-3 d-flex">
                <div class="col-1"></div>
                <ul class="nav nav-pills text-center">
                    <li class="nav-item">
                        <RouterLink to="../shopping/index" class="nav-link" :class="{'active':data.formName==='index'}">
                            主页
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="../shopping/shoppingList" class="nav-link" :class="{'active':data.formName==='shoppingList'}">
                            商品页面
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="" class="nav-link" :class="{'active':data.formName==='about'}">
                            关于网上书店
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="col-3">
                <div class="navbar-collapse d-flex justify-content-end" >
                    <input class="form-control me-2" type="search" v-model="data.searchValue" placeholder="输入图书名" aria-label="Search">
                    <button class="btn btn-outline-success"
                            @click="$emit('getBookList',data.searchValue,shoppingData.selectedCid,shoppingData.selectedPage)">
                        Search
                    </button>
                </div>
            </div>
            <div class="col-3 dropdown d-flex justify-content-end">
                <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown"
                   aria-expanded="false">
                    <img :src="'data:image/png;base64,'+data.userJSON.imageString" alt="mdo" width="32" height="32"
                         class="rounded-circle">
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><RouterLink to="../user/self" class="dropdown-item">个人中心</RouterLink></li>
                    <li><RouterLink to="../user/cart" class="dropdown-item">我的购物车</RouterLink></li>
                    <li><RouterLink to="../user/order" class="dropdown-item">我的订单</RouterLink></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="">退出登录</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script setup>
import {defineEmits, defineProps, onMounted, reactive} from "vue";
import {useRoute} from "vue-router";

const data = reactive({
    searchValue: '',
    userJSON: '',
    formName: ''
})
defineProps(['shoppingData'])
defineEmits(['getBookList'])
onMounted(() => {
    data.userJSON = JSON.parse(sessionStorage.getItem('userJSON'))
    data.formName = useRoute().name
})
</script>
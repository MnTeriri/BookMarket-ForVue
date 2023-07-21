<template>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal"
         aria-hidden="true">
        <div class="modal-dialog modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">确认删除</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">是否删除该商品信息</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" @click="deleteCart">确定</button>
            </div>
        </div>
    </div>

    <div class="container-fluid vh-300" style="background: #f1f1f1">
        <div class="col-8 m-auto p-3 justify-content-center rounded">
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                <h2>我的购物车</h2>
                <div class="dropdown text-end">
                    <a href="" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown"
                       aria-expanded="false">
                        <img src="" alt="mdo" width="32" height="32" class="rounded-circle">
                    </a>
                    <ul class="dropdown-menu text-small">
                        <li><a class="dropdown-item" href="">个人中心</a></li>
                        <li><a class="dropdown-item" href="">我的购物车</a></li>
                        <li><a class="dropdown-item" href="">我的订单</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="">退出登录</a></li>
                    </ul>
                </div>
            </header>
        </div>
        <div class="border-bottom mb-4"></div>
        <div class="row col-8 m-auto p-3 justify-content-center rounded border bg-light mb-3">
            <main>
                <table class="table align-middle text-center">
                    <thead>
                    <tr>
                        <th class="text-md-start">
                            <input class="form-check-input" type="checkbox"
                                   :disabled="data.totalCartCount===0"
                                   :checked="data.totalCartCount===data.selectedCartCount&&data.totalCartCount!==0">全选
                        </th>
                        <th scope="col">商品图片</th>
                        <th scope="col">商品名称</th>
                        <th scope="col">单价</th>
                        <th scope="col">数量</th>
                        <th scope="col">小记</th>
                        <th scope="col">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="cart in data.cartList" :key="cart">
                        <tr :class="{'table-warning':cart.book.status===1||cart.count>cart.book.count,'table-danger':cart.book.status===2}">
                            <td>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox"
                                           :disabled="cart.book.status!==0||cart.count>cart.book.count"
                                           :checked="cart.book.status===0&&cart.count<=cart.book.count&&cart.selected===1">
                                </div>
                            </td>
                            <td><img :src="'data:image/png;base64,'+cart.book.imageString" style="height: 50px"></td>
                            <td :class="{'text-danger':cart.book.status!==0||cart.count>cart.book.count}">
                                <template v-if="cart.book.status===1">{{ cart.book.bname }}【缺货】</template>
                                <template v-else-if="cart.book.status===2">{{ cart.book.bname }}【已下架】</template>
                                <template v-else-if="cart.count>cart.book.count">{{ cart.book.bname }}【库存不足】
                                </template>
                                <template v-else>{{ cart.book.bname }}</template>
                            </td>
                            <td :class="{'text-danger':cart.book.status!==0||cart.count>cart.book.count}">
                                {{ cart.book.price }}
                            </td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Basic outlined example">
                                    <button type="button" class="btn btn-outline-secondary"
                                            :disabled="cart.book.status!==0" @click="subCartCount(cart.id)">-
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary" disabled>{{ cart.count }}
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary"
                                            :disabled="cart.book.status!==0||cart.count>cart.book.count"
                                            @click="addCartCount(cart.id)">+
                                    </button>
                                </div>
                            </td>
                            <td :class="{'text-danger':cart.book.status!==0||cart.count>cart.book.count}">
                                {{ (cart.book.price * cart.count).toFixed(2) }}
                            </td>
                            <td>
                                <button type="button" class="btn-close" aria-label="Close"
                                        @click="deleteModal.show();deleteCartId=cart.id"></button>
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </main>
        </div>
        <div class="col-8 m-auto p-3 justify-content-center rounded bg-light">
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                <a href="">继续购物</a>
            </header>
        </div>
        <FooterForm/>
    </div>
</template>
<script setup>
import FooterForm from "@/components/FooterForm.vue";
import {getCurrentInstance, onMounted, reactive} from "vue";
import swal from 'sweetalert'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'

const {proxy} = getCurrentInstance()
let deleteModal = null;
let deleteCartId;
const data = reactive({
    cartList: [],
    selectedCartCount: 0,
    totalCartCount: 0,
})

onMounted(() => {
    getCartList()
    deleteModal = new bootstrap.Modal('#deleteModal');
})

function getCartList() {
    proxy.$axios.post('/cart/cartList').then(response => {
        data.cartList = response.data.cartList
        data.selectedCartCount = response.data.selectedCartCount
        data.totalCartCount = response.data.totalCartCount
    })
}


function addCartCount(id) {
    proxy.$axios.post('/cart/addCartCount', {id: id}).then(response => {
        if (response.data === 1) {
            getCartList()
        } else if (response.data === -1) {
            swal("更新失败", {buttons: false, timer: 1000, icon: "warning"});
            setTimeout(function () {getCartList()}, 1300)
        } else if (response.data === -2) {
            swal("书籍库存不足", {buttons: false, timer: 1000, icon: "warning"});
            setTimeout(function () {getCartList()}, 1300)
        } else {
            swal("错误", {buttons: false, timer: 1000, icon: "error"});
            setTimeout(function () {getCartList()}, 1300)
        }
    })
}

function subCartCount(id) {
    proxy.$axios.post('/cart/subCartCount', {id: id}).then(response => {
        if (response.data === 1) {
            getCartList()
        } else if (response.data === -1) {
            swal("更新失败", {buttons: false, timer: 1000, icon: "warning"});
            setTimeout(function () {getCartList()}, 1300)
        } else if (response.data === -2) {
            swal("商品数量不能少于1", {buttons: false, timer: 1000, icon: "warning"});
            setTimeout(function () {getCartList()}, 1300)
        } else {
            swal("错误", {buttons: false, timer: 1000, icon: "error"});
            setTimeout(function () {getCartList()}, 1300)
        }
    })
}

function deleteCart() {
    deleteModal.hide()
    proxy.$axios.post('/cart/deleteCart', {id: deleteCartId}).then(response => {
        if (response.data === 1) {
            swal("删除成功", {buttons: false, timer: 1000, icon: "success"});
            setTimeout(function () {getCartList()}, 1300);
        } else {
            swal("错误", {buttons: false, timer: 1000, icon: "error"});
            setTimeout(function () {getCartList()}, 1300);
        }
    })
}
</script>
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
    <div class="modal fade modal-lg" id="orderModal" tabindex="-1" aria-labelledby="orderModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="orderMsg">订单信息</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row flex-wrap align-items-center justify-content-center">
                            <div class="col-2 text-center">
                                <button type="button" class="btn btn-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor"
                                         class="bi bi-geo-alt" viewBox="0 0 16 16">
                                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"></path>
                                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="col-10">
                                <label class="form-check-label" style="font-size: 25px">
                                    {{ data.selectedAddress.receiverName }}&nbsp;&nbsp;
                                </label>
                                <label class="form-check-label" style="color: #797979">
                                    {{ data.selectedAddress.phone }}
                                </label>
                                <input type="hidden" id="aid" value="${address.id}">
                                <p class="form-check-label" style="font-size: 5px;color: #797979;margin-top: 10px">
                                    【默认地址】{{ data.selectedAddress.province }}&nbsp;{{ data.selectedAddress.city }}&nbsp;{{ data.selectedAddress.district }}&nbsp;{{ data.selectedAddress.address }}&nbsp;
                                </p>
                            </div>
                        </div>
                        <hr class="text-body-tertiary">
                        <table class="table align-middle text-center">
                            <thead>
                            <tr>
                                <th scope="col">商品图片</th>
                                <th scope="col">商品名称</th>
                                <th scope="col">单价</th>
                                <th scope="col">数量</th>
                                <th scope="col">小记</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="cart in data.cartList" :key="cart">
                                <tr v-if="cart.selected===1">
                                    <td><img :src="'data:image/png;base64,'+cart.book.imageString" style="height: 50px">
                                    </td>
                                    <td>{{ cart.book.bname }}</td>
                                    <td>{{ cart.book.price }}</td>
                                    <td>{{ cart.count }}</td>
                                    <td>{{ (cart.book.price * cart.count).toFixed(2) }}</td>
                                </tr>
                            </template>
                            </tbody>
                        </table>
                        <div class="col-12 text-end">
                            <label class="text-lg-end">合计：{{ totalPrice.toFixed(2) }}元&nbsp;&nbsp;</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="createOrder">结算</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="payModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">这是一个付款界面</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="getCartList"></button>
                </div>
                <div class="modal-body">
                    是否立即付款
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="getCartList">关闭</button>
                    <button type="button" class="btn btn-primary">付款</button>
                </div>
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
                                   v-model="data.selectAll"
                                   :disabled="data.totalCartCount===0"
                                   @click="selectAllCart">全选
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
                                           :checked="cart.book.status===0&&cart.count<=cart.book.count&&cart.selected===1"
                                           @click="selectCart(cart.id)">
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
                <RouterLink to="../shopping/shoppingList">继续购物</RouterLink>
                <div>
                    <label class="text-lg-end">合计：{{ totalPrice.toFixed(2) }}元&nbsp;&nbsp;</label>
                    <button type="button" class="btn btn-outline-secondary me-2" data-bs-toggle="modal"
                            :disabled="data.selectedCartCount===0"
                            data-bs-target="#orderModal">结算
                    </button>
                </div>
            </header>
        </div>
        <FooterForm/>
    </div>

</template>
<script setup>
import FooterForm from "@/components/FooterForm.vue";
import {computed, getCurrentInstance, onMounted, reactive} from "vue";
import swal from 'sweetalert'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'

const {proxy} = getCurrentInstance()
let deleteModal = null;
let deleteCartId;
const data = reactive({
    cartList: [],
    selectedAddress: {},
    selectedCartCount: 0,
    totalCartCount: 0,
    selectAll: false
})

onMounted(() => {
    getCartList()
    deleteModal = new bootstrap.Modal('#deleteModal');
})

const totalPrice = computed(() => {
    let sum = 0;
    for (let i = 0; i < data.cartList.length; i++) {
        if (data.cartList[i].selected === 1) {
            sum = sum + data.cartList[i].book.price * data.cartList[i].count
        }
    }
    return sum;
});

function getCartList() {
    proxy.$axios.post('/cart/cartList').then(response => {
        data.cartList = response.data.cartList
        data.selectedCartCount = response.data.selectedCartCount
        data.totalCartCount = response.data.totalCartCount
        data.selectedAddress = response.data.address
        data.selectAll = data.totalCartCount === data.selectedCartCount && data.totalCartCount !== 0
    })
}

function selectAllCart() {
    proxy.$axios.post('/cart/selectAllCart', {selected: Number(!data.selectAll)}).then(function (response) {
        if (response.data === 1) {
            getCartList()
        } else {
            swal("错误", {buttons: false, timer: 1000, icon: "error"});
            setTimeout(function () {getCartList()}, 1300);
        }
    });
}

function selectCart(id) {
    proxy.$axios.post('/cart/selectCart', {id: id}).then(function (response) {
        if (response.data === 1) {
            getCartList()
        } else if (response.data === -1) {
            swal("更新失败", {buttons: false, timer: 1000, icon: "warning"});
            setTimeout(function () {getCartList()}, 1300);
        } else if (response.data === -2) {
            swal("书籍下架或缺货", {buttons: false, timer: 1000, icon: "warning"});
            setTimeout(function () {getCartList()}, 1300);
        } else {
            swal("错误", {buttons: false, timer: 1000, icon: "error"});
            setTimeout(function () {getCartList()}, 1300);
        }
    });
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

function createOrder() {
    if (data.selectedAddress === {}) {
        swal("未选择地址", {buttons: false, timer: 1000, icon: "warning"});
        return;
    }
    proxy.$axios.post('/order/createOrder', {aid: data.selectedAddress.aid}).then(function (response) {
        console.log(response.data)
        // if (json.response === 1) {
        //     swal("下单成功", {buttons: false, timer: 1000, icon: "success"});
        //     setTimeout(function () {
        //         $('#orderModal').modal('hide');
        //         $('#payModal').modal('show');
        //     }, 1300);
        // } else if (json.response === -1) {
        //     swal("书籍库存不足", {buttons: false, timer: 1000, icon: "warning"});
        //     setTimeout(function () {location.reload();}, 1300);
        // } else if (json.response === -2) {
        //     swal("书籍缺货或下架", {buttons: false, timer: 1000, icon: "warning"});
        //     setTimeout(function () {location.reload();}, 1300);
        // } else if (json.response === -3) {
        //     swal("未选中商品", {buttons: false, timer: 1000, icon: "warning"});
        //     setTimeout(function () {location.reload();}, 1300);
        // } else {
        //     swal("错误", {buttons: false, timer: 1000, icon: "error"});
        //     setTimeout(function () {location.reload();}, 1300);
        // }
    });
}
</script>
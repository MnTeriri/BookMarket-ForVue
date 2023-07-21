<template>
    <div class="container" style="width: 90%">
        <div class="row">
            <HeaderForm/>
            <SideMenu :orderFilter="data.orderFilter"/>
            &nbsp;&nbsp;
            <div class="col-md-9 " style="background: #f1f1f1;">
                <div style="margin: 20px">
                    <div style="height: 20px"></div>
                    <h4 style="margin-bottom: 20px">&nbsp;&nbsp;我的订单</h4>
                    <div class="row" style="height: 30px;margin-bottom: 20px">
                        <div class="col-8">
                            <nav class="nav">
                                <a id="-1a" class="nav-link text-secondary" style="font-size: 2px"
                                   href="../user/order?status=-1">全部订单</a>
                                <a id="0a" class="nav-link text-secondary" style="font-size: 2px"
                                   href="../user/order?status=0">待支付</a>
                                <a id="-2a" class="nav-link text-secondary" style="font-size: 2px"
                                   href="../user/order?status=-2">待收货</a>
                                <a id="-3a" class="nav-link text-secondary" style="font-size: 2px"
                                   href="../user/order?status=-3">已完成</a>
                                <a id="-4a" class="nav-link text-secondary" style="font-size: 2px"
                                   href="../user/order?status=-4">已取消</a>
                            </nav>
                        </div>
                        <div class="col-4">
                            <div class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="输入订单号搜索"
                                       aria-label="输入订单号搜索">
                                <button class="btn btn-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <template v-for="order in data.orderList" :key="order.id">
                        <div class="row">
                            <div class="container border" style="background-color: #FEFFF6">
                                <div class="row" style="height: 70px;margin: 10px">
                                    <a style="font-size: 30px;color: #FF952F">{{ data.orderStatus[order.status] }}</a>
                                    <div class="col-9">
                                        <a style="font-size: 10px;color: #797979">创建时间：{{order.createdTime}}</a>&nbsp;
                                        <a style="font-size: 10px;color: #797979">收货人：{{ order.address.receiverName }}</a>&nbsp;
                                        <a style="font-size: 10px;color: #797979">订单号：{{ order.oid }}</a>
                                    </div>
                                    <div class="col-3 text-end">
                                        <p style="font-size: 10px;color: #797979">实付金额：<a style="font-size: 20px;color: black">{{ order.price }}</a>元</p>
                                    </div>
                                </div>
                            </div>
                            <div class="container border bg-light mb-3">
                                <div class="row">
                                    <div class="col-8">
                                        <div v-for="orderBook in order.books" :key="orderBook.id" class="row-cols-3" style="height: 100px;margin: 15px">
                                            <img style="height: 90px;width: 90px" :src="'data:image/png;base64,'+orderBook.book.imageString" class="order-img">
                                            <a>{{ orderBook.book.bname }}</a>
                                            <a>{{ orderBook.price }}×{{ orderBook.count }}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div v-if="data.orderList.length===0" class="row text-center" style="height: 200px;">
                        <h6>当前没有订单！</h6>
                    </div>
                </div>
            </div>
        </div>
        <Utils/>
        <FooterForm/>
    </div>
</template>

<script setup>
import SideMenu from "@/components/userForm/user/SideMenu.vue";
import Utils from "@/components/userForm/Utils.vue";
import FooterForm from "@/components/FooterForm.vue";
import HeaderForm from "@/components/userForm/HeaderForm.vue";
import {getCurrentInstance, onMounted, reactive} from "vue";
import {onBeforeRouteUpdate} from "vue-router";

const {proxy} = getCurrentInstance()
const data = reactive({
    orderFilter: '',
    orderList: [],
    orderStatus: {
        '0': '待付款',
        '1': '已付款',
        '2': '已发货',
        '3': '交易成功',
        '4': '已取消',
        '5': '退货中',
        '6': '退货成功'
    }
})

onBeforeRouteUpdate((to, from, next) => {//用于相同路径切换，执行某种事件
    data.orderFilter = to.query.orderFilter
    getOrderList()
    next()
})
onMounted(() => {
    data.orderFilter = proxy.$route.query.orderFilter
    getOrderList()
})

function getOrderList() {
    proxy.$axios.post('/order/orderList', {orderFilter: data.orderFilter}).then(response => {
        data.orderList = response.data
    })
}
</script>
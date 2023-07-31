<template>
    <div class="container" style="width: 90%">
        <div class="row">
            <HeaderForm/>
            <SideMenu :orderFilter="data.orderFilter"/>
            &nbsp;&nbsp;
            <div class="col-md-9" style="background: #f1f1f1;">
                <div style="margin: 20px">
                    <div style="height: 20px"></div>
                    <h4 style="margin-bottom: 20px">&nbsp;&nbsp;我的订单</h4>
                    <div class="row" style="height: 30px;margin-bottom: 20px">
                        <div class="col-8">
                            <nav class="nav">
                                <RouterLink :to="{path:'order',query:{orderFilter:'all'}}" class="nav-link" :class="{'text-secondary':data.orderFilter!=='all'}" style="font-size: 2px">全部订单</RouterLink>
                                <RouterLink :to="{path:'order',query:{orderFilter:'notPay'}}" class="nav-link" :class="{'text-secondary':data.orderFilter!=='notPay'}" style="font-size: 2px">待支付订单</RouterLink>
                                <RouterLink :to="{path:'order',query:{orderFilter:'notReceive'}}" class="nav-link" :class="{'text-secondary':data.orderFilter!=='notReceive'}" style="font-size: 2px">待收货订单</RouterLink>
                                <RouterLink :to="{path:'order',query:{orderFilter:'finish'}}" class="nav-link" :class="{'text-secondary':data.orderFilter!=='finish'}" style="font-size: 2px">已完成订单</RouterLink>
                                <RouterLink :to="{path:'order',query:{orderFilter:'cancel'}}" class="nav-link" :class="{'text-secondary':data.orderFilter!=='cancel'}" style="font-size: 2px">已取消订单</RouterLink>
                            </nav>
                        </div>
                        <div class="col-4">
                            <div class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="输入订单号搜索" aria-label="输入订单号搜索" v-model="data.searchOid">
                                <button class="btn btn-secondary" @click="getOrderList(data.searchOid,1)">
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
                                        <a style="font-size: 10px;color: #797979">创建时间：{{ order.createdTime }}</a>&nbsp;
                                        <a style="font-size: 10px;color: #797979">收货人：{{
                                                order.address.receiverName
                                            }}</a>&nbsp;
                                        <a style="font-size: 10px;color: #797979">订单号：{{ order.oid }}</a>
                                    </div>
                                    <div class="col-3 text-end">
                                        <p style="font-size: 10px;color: #797979">实付金额：<a
                                                style="font-size: 20px;color: black">{{ order.price }}</a>元</p>
                                    </div>
                                </div>
                            </div>
                            <div class="container border bg-light mb-3">
                                <div class="row">
                                    <div class="col-8">
                                        <div v-for="orderBook in order.books" :key="orderBook.id" class="row-cols-3"
                                             style="height: 100px;margin: 15px">
                                            <img style="height: 90px;width: 90px"
                                                 :src="'data:image/png;base64,'+orderBook.book.imageString"
                                                 class="order-img">
                                            <a>{{ orderBook.book.bname }}</a>
                                            <a>{{ orderBook.price }}×{{ orderBook.count }}</a>
                                        </div>
                                    </div>
                                    <div class="col-4 text-center" style="padding-top: 10px">
                                        <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
                                            <template v-if="order.status===0">
                                                <button type="button" class="btn btn-outline-success"
                                                        onclick="payOrder('${order.oid}')">立即付款
                                                </button>
                                                <button type="button" class="btn btn-outline-danger"
                                                        onclick="cancelOrder('${order.oid}')">取消订单
                                                </button>
                                            </template>
                                            <template v-else-if="order.status===1">
                                                <button type="button" class="btn btn-outline-danger"
                                                        onclick="cancelOrder('${order.oid}')">取消订单
                                                </button>
                                            </template>
                                            <template v-else-if="order.status===2">
                                                <button type="button" class="btn btn-outline-success"
                                                        onclick="confirmOrder('${order.oid}')">确认收货
                                                </button>
                                            </template>
                                            <template v-else-if="order.status===3">
                                                <button type="button" class="btn btn-outline-danger"
                                                        onclick="returnGoods('${order.oid}')">申请退货
                                                </button>
                                            </template>
                                            <button type="button" class="btn btn-outline-warning"
                                                    onclick="showOrderDetail(${order.toJSONString()})">订单详情
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div v-if="data.orderList.length===0" class="row text-center" style="height: 200px;">
                        <h6>当前没有订单！</h6>
                    </div>
                    <div v-if="data.totalPage!==0" class="d-flex justify-content-center" style="padding: 20px">
                        <nav>
                            <ul class="pagination">
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <template v-if="data.totalPage<=7"><!--总页数小于等于7-->
                                    <template v-for="item in data.totalPage" :key="item">
                                        <li class="page-item" :class="{'active':data.selectedPage===item}">
                                            <span class="page-link" @click="getOrderList(data.searchOid,item)">{{ item }}</span>
                                        </li>
                                    </template>
                                </template>
                                <template v-else><!--总页数大于7-->
                                    <template v-if="data.selectedPage<=4"><!--当已选择页数小于等于4时-->
                                        <template v-for="item in 5" :key="item">
                                            <li class="page-item" :class="{'active':data.selectedPage===item}">
                                                <span class="page-link" @click="getOrderList(data.searchOid,item)">{{ item }}</span>
                                            </li>
                                        </template>
                                        <li class="page-item disabled">
                                            <span class="page-link">...</span>
                                        </li>
                                        <li class="page-item">
                                            <span class="page-link" @click="getOrderList(data.searchOid,data.totalPage)">{{data.totalPage}}</span>
                                        </li>
                                    </template>
                                    <template v-else-if="data.selectedPage<=data.totalPage-4"><!--当已选择页数小于等于总页数-4时-->
                                        <li class="page-item">
                                            <span class="page-link" @click="getOrderList(data.searchOid,1)">1</span>
                                        </li>
                                        <li class="page-item disabled">
                                            <span class="page-link">...</span>
                                        </li>
                                        <template v-for="item in 3" :key="item">
                                            <li class="page-item" :class="{'active':item===2}">
                                                <span class="page-link" @click="getOrderList(data.searchOid,data.selectedPage-2+item)">{{data.selectedPage - 2 + item}}</span>
                                            </li>
                                        </template>
                                        <li class="page-item disabled">
                                            <span class="page-link">...</span>
                                        </li>
                                        <li class="page-item">
                                            <span class="page-link" @click="getOrderList(data.searchOid,data.totalPage)">{{data.totalPage}}</span>
                                        </li>
                                    </template>
                                    <template v-else><!--当已选择页数大于总页数-4时-->
                                        <li class="page-item">
                                            <span class="page-link" @click="getOrderList(data.searchOid,1)">1</span>
                                        </li>
                                        <li class="page-item disabled">
                                            <span class="page-link">...</span>
                                        </li>
                                        <template v-for="item in 5" :key="item">
                                            <li class="page-item" :class="{'active':data.totalPage-5+item===data.selectedPage}">
                                                <span class="page-link" @click="getOrderList(data.searchOid,data.totalPage-5+item)">{{data.totalPage - 5 + item}}</span>
                                            </li>
                                        </template>
                                    </template>
                                </template>
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
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
    totalPage: 1,
    selectedPage: 1,
    searchOid: '',
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
    getOrderList('',1)
    next()
})
onMounted(() => {
    data.orderFilter = proxy.$route.query.orderFilter
    getOrderList('',1)
})

function getOrderList(oid,page) {
    data.searchOid=oid;
    data.selectedPage=page;
    proxy.$axios.post('/order/orderList', {oid:data.searchOid,orderFilter: data.orderFilter, page: page}).then(response => {
        data.orderList = response.data.orderList;
        data.totalPage = response.data.totalPage;
    })
}
</script>
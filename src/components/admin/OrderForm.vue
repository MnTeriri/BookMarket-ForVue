<template>
    <div class="d-flex flex-column" style="height: 100vh">
        <HeadForm/>
        <div class="d-flex flex-fill overflow-hidden">
            <SideMenu/>
            <div class="container-fluid overflow-auto">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>订单号</th>
                        <th>用户编号</th>
                        <th>总价</th>
                        <th>订单创建时间</th>
                        <th>订单付款时间</th>
                        <th>订单发货时间</th>
                        <th>订单完成时间</th>
                        <th>订单状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="order in data.orderList" :key="order">
                        <td>{{ order.oid }}</td>
                        <td>{{ order.uid }}</td>
                        <td>{{ order.price }}</td>
                        <td>{{ formattedDate(order.created_time) }}</td>
                        <td>{{ formattedDate(order.pay_time) }}</td>
                        <td>{{ formattedDate(order.send_time) }}</td>
                        <td>{{ formattedDate(order.finish_time) }}</td>
                        <td>{{ data.status[order.status] }}</td>
                        <td>
                            <button class="btn btn-primary btn-sm">修改</button>
                            <button class="btn btn-warning btn-sm">存储明细</button>
                            <button class="btn btn-success btn-sm">上架</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
import HeadForm from "@/components/admin/HeadForm.vue";
import SideMenu from "@/components/admin/SideMenu.vue";
import {onMounted, reactive} from "vue";
import {QWebChannel} from "@/assets/js/qwebchannel";

const data = reactive({
    orderList: {},
    status: {'0': '待付款', '1': '已付款', '2': '已发货', '3': '交易成功', '4': '交易取消', '5': '退货', '6': '退货成功'},
    totalPage: 1,
    selectedPage: 1,
    pageCount: 10,
    recordsTotal: 0,
    recordsFiltered: 0,
    searchName: ''
})
let proxyService;
onMounted(() => {
    //eslint-disable-next-line no-undef
    new QWebChannel(qt.webChannelTransport, function (channel) {
        proxyService = channel.objects.proxyService;// 获取Qt注册的对象
        getOrderList(1)
    })
})

function getOrderList(page) {
    data.selectedPage = page
    proxyService.executeService('OrderService', 'getOrderList', {
        oid: '',
        page: page,
        count: data.pageCount
    }, function (response) {
        console.log(response)
        data.orderList = response.orderList;
        // data.recordsTotal = response.recordsTotal;
        // data.recordsFiltered = response.recordsFiltered;
        // if (data.recordsFiltered % data.pageCount === 0) {//计算总页数
        //     data.totalPage = Math.trunc(data.recordsFiltered / data.pageCount);
        // } else {
        //     data.totalPage = Math.trunc(data.recordsFiltered / data.pageCount) + 1;
        // }
    })
}

function formattedDate(date) {
    if (date === '') {
        return '---';
    }
    let dateObject = new Date(date);
    let year = dateObject.getFullYear()
    let month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
    let day = dateObject.getDate().toString().padStart(2, '0')
    let hour = dateObject.getHours().toString().padStart(2, '0')
    let minute = dateObject.getMinutes().toString().padStart(2, '0')
    let second = dateObject.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
</script>

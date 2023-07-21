<template>
    <div class="col-md-2 nav flex-column justify-content-center text-center" style="background: #f1f1f1;height: 400px">
        <p></p>
        <p></p>
        <h6>个人中心</h6>
        <p></p>
        <p :class="{'text-primary':data.formName==='SelfForm'}" style="font-size: 2px">
            <RouterLink to="self" class="list-group-item list-group-item-action">我的个人中心</RouterLink>
        </p>
        <p :class="{'text-primary':data.formName==='AddressForm'}" style="font-size: 2px">
            <RouterLink to="address" class="list-group-item list-group-item-action">收货地址</RouterLink>
        </p>
        <p></p>
        <h6>订单中心</h6>
        <p></p>
        <p id="-1p" class="text-secondary" style="font-size: 2px">
            <a href="../user/order?status=-1" class="list-group-item list-group-item-action">全部订单</a>
        </p>
        <p id="0p" class="text-secondary" style="font-size: 2px">
            <a href="../user/order?status=0" class="list-group-item list-group-item-action">待支付订单</a>
        </p>
        <p id="-2p" class="text-secondary" style="font-size: 2px">
            <a href="../user/order?status=-2" class="list-group-item list-group-item-action">待收货订单</a>
        </p>
        <p id="-3p" class="text-secondary" style="font-size: 2px">
            <a href="../user/order?status=-3" class="list-group-item list-group-item-action">已完成订单</a>
        </p>
        <p id="-4p" class="text-secondary" style="font-size: 2px">
            <a href="../user/order?status=-4" class="list-group-item list-group-item-action">已取消订单</a>
        </p>
    </div>
</template>
<script setup>
import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";

const data = reactive({
    formName: ''
})
onMounted(() => {
    data.formName = useRoute().name
})
</script>
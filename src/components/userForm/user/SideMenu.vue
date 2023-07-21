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
        <p :class="{'text-primary':orderFilter==='all'}" style="font-size: 2px">
            <RouterLink :to="{path:'order',query:{orderFilter:'all'}}" class="list-group-item list-group-item-action">
                全部订单
            </RouterLink>
        </p>
        <p :class="{'text-primary':orderFilter==='notPay'}" style="font-size: 2px">
            <RouterLink :to="{path:'order',query:{orderFilter:'notPay'}}" class="list-group-item list-group-item-action">
                待支付订单
            </RouterLink>
        </p>
        <p :class="{'text-primary':orderFilter==='notReceive'}" style="font-size: 2px">
            <RouterLink :to="{path:'order',query:{orderFilter:'notReceive'}}" class="list-group-item list-group-item-action">
                待收货订单
            </RouterLink>
        </p>
        <p :class="{'text-primary':orderFilter==='finish'}" style="font-size: 2px">
            <RouterLink :to="{path:'order',query:{orderFilter:'finish'}}" class="list-group-item list-group-item-action">
                已完成订单
            </RouterLink>
        </p>
        <p :class="{'text-primary':orderFilter==='cancel'}" style="font-size: 2px">
            <RouterLink :to="{path:'order',query:{orderFilter:'cancel'}}" class="list-group-item list-group-item-action">
                已取消订单
            </RouterLink>
        </p>
    </div>
</template>
<script setup>
import {onMounted, reactive, defineProps} from "vue";
import {useRoute} from "vue-router";

defineProps(['orderFilter'])
const data = reactive({
    formName: ''
})
onMounted(() => {
    data.formName = useRoute().name
})
</script>
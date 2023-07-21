<template>
    <div class="container" style="width: 90%">
        <div class="row">
            <HeaderForm/>
            <SideMenu/>
            &nbsp;&nbsp;
            <div class="col-md-9" style="background: #f1f1f1">
                <div style="margin: 30px">
                    <div class="row border-bottom" style="height: 200px;margin-bottom: 30px">
                        <div class="col-3">
                            <img :src="'data:image/png;base64,'+data.userJSON.imageString" class="img-thumbnail" style="width: 150px">
                        </div>
                        <div class="col-3 text-right">
                            <p>{{data.userJSON.uname}}</p>
                            <p class="text-primary" style="font-size: 2px">
                                <a type="button" class="list-group-item list-group-item-action">修改个人信息</a>
                            </p>
                            <p class="text-primary" style="font-size: 2px">
                                <a type="button" class="list-group-item list-group-item-action" data-bs-toggle="modal"
                                   data-bs-target="#updatePasswordModal">修改密码</a>
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2" style="margin-right: 20px">
                            <img src="../../../assets/image/portal-icon-1.png">&nbsp;
                        </div>
                        <div class="col-sm-3 nav flex-column justify-content-center">
                            <div>
                                <p>待支付的订单：${notPayOrderCount}</p>
                            </div>
                            <div>
                                <p class="text-primary" style="font-size: 2px">
                                    <a href="../user/order?status=0" class="list-group-item list-group-item-action">查看待支付的订单 ></a>
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-2" style="margin-right: 20px">
                            <img src="../../../assets/image/portal-icon-2.png">&nbsp;
                        </div>
                        <div class="col-sm-3 nav flex-column justify-content-center">
                            <div>
                                <p>待收货的订单：${notReceiveOrderCount}</p>
                            </div>
                            <div>
                                <p class="text-primary" style="font-size: 2px">
                                    <a href="../user/order?status=-2" class="list-group-item list-group-item-action">查看待收货的订单 ></a>
                                </p>
                            </div>
                        </div>
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
import HeaderForm from "@/components/userForm/HeaderForm.vue";
import {onMounted, reactive} from "vue";
import FooterForm from "@/components/FooterForm.vue";
import Utils from "@/components/userForm/Utils.vue";

const data = reactive({
    userJSON: ''
})
onMounted(() => {
    data.userJSON = JSON.parse(sessionStorage.getItem('userJSON'))
})
</script>
<template>
    <div class="modal fade" id="updatePasswordModal" tabindex="-1" aria-labelledby="updatePasswordModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="orderMsg">修改密码</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-floating mb-3">
                        <input type="password" v-model="data.oldPassword" class="form-control" placeholder="name@example.com">
                        <label>原密码</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" v-model="data.newPassword" class="form-control" placeholder="name@example.com">
                        <label>新密码</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" v-model="data.reNewPassword" class="form-control" placeholder="name@example.com">
                        <label>再次输入新密码</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updatePassword">确定</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="updateSelfMsgModal" tabindex="-1" aria-labelledby="updateSelfMsgModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">修改个人信息</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="uname" placeholder="name@example.com" v-model="data.userJSON.uname">
                        <label for="uname">昵称</label>
                    </div>
                    <div class="mb-3">
                        <label for="imageFile" class="form-label">头像</label>
                        <input type="file" class="form-control" id="imageFile" placeholder="image">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary">确定</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container" style="width: 90%">
        <div class="row">
            <HeaderForm/>
            <SideMenu/>
            &nbsp;&nbsp;
            <div class="col-md-9" style="background: #f1f1f1">
                <div style="margin: 30px">
                    <div class="row border-bottom" style="height: 200px;margin-bottom: 30px">
                        <div class="col-3">
                            <img :src="'data:image/png;base64,'+data.userJSON.imageString" class="img-thumbnail"
                                 style="width: 150px">
                        </div>
                        <div class="col-3 text-right">
                            <p>{{ data.userJSON.uname }}</p>
                            <p class="text-primary" style="font-size: 2px">
                                <a type="button" class="list-group-item list-group-item-action" data-bs-toggle="modal"
                                   data-bs-target="#updateSelfMsgModal">修改个人信息</a>
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
                                <p>待支付的订单：{{ data.notPayOrderCount }}</p>
                            </div>
                            <div>
                                <p class="text-primary" style="font-size: 2px">
                                    <RouterLink :to="{path:'order',query:{orderFilter:'notPay'}}" class="list-group-item list-group-item-action">
                                        查看待支付的订单 >
                                    </RouterLink>
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-2" style="margin-right: 20px">
                            <img src="../../../assets/image/portal-icon-2.png">&nbsp;
                        </div>
                        <div class="col-sm-3 nav flex-column justify-content-center">
                            <div>
                                <p>待收货的订单：{{ data.notReceiveOrderCount }}</p>
                            </div>
                            <div>
                                <p class="text-primary" style="font-size: 2px">
                                    <RouterLink :to="{path:'order',query:{orderFilter:'notReceive'}}" class="list-group-item list-group-item-action">
                                        查看待收货的订单 >
                                    </RouterLink>
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
import {getCurrentInstance, onMounted, reactive} from "vue";
import FooterForm from "@/components/FooterForm.vue";
import Utils from "@/components/userForm/Utils.vue";
import swal from "sweetalert";

const {proxy} = getCurrentInstance()

const data = reactive({
    userJSON: '',
    notPayOrderCount:0,
    notReceiveOrderCount:0,
    oldPassword: '',
    newPassword: '',
    reNewPassword: ''
})

onMounted(() => {
    data.userJSON = JSON.parse(sessionStorage.getItem('userJSON'))
    proxy.$axios.post('/order/getOrderCount').then(response => {
        data.notPayOrderCount = response.data.notPayOrderCount
        data.notReceiveOrderCount = response.data.notReceiveOrderCount
    })
})

function updatePassword() {
    if (data.newPassword === data.reNewPassword) {
        proxy.$axios.post('/user/updatePassword', {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }).then(response => {
            if (response.data === -3) {
                swal("原密码错误", {buttons: false, timer: 1000, icon: "warning"})
            } else if (response.data === -2) {
                swal("账号不存在", {buttons: false, timer: 1000, icon: "warning"});
            } else if (response.data === 1) {
                swal("修改成功", {buttons: false, timer: 1000, icon: "success"});
            } else {
                swal("错误", {buttons: false, timer: 1000, icon: "error"});
            }
        })
    }else{
        swal("两次输入不一致", {buttons: false, timer: 1000, icon: "warning"});
    }

}
</script>
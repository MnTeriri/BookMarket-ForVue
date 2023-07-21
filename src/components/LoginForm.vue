<template>
    <div class="container">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <div class="col-3"></div>
        </header>
        <div class="carousel slide container row">
            <div class="col-md-7">
                <img src="../assets/image/login.png" alt="...">
            </div>
            <div class="col-md-4" style="margin-top: 30px;padding-top: 20px;margin-left: 50px">
                <div class="form-floating mb-3">
                    <a class="btn btn-light disabled" role="button" aria-disabled="true">登录</a>
                    <a class="btn btn-light" href="/register" role="button" aria-disabled="true">注册</a>
                </div>
                <div class="form-floating mb-3">
                    <input id="uid" type="text" class="form-control" v-model="data.uid"
                           :class="{'is-invalid':data.uidInvalid}"
                           @input="data.uidInvalid = v$.uid.$invalid"
                           placeholder="账号">
                    <label for="uid">账号</label>
                    <div class="invalid-feedback">账号必须是9位数字！</div>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" v-model="data.password"
                           :class="{'is-invalid':data.passwordInvalid}"
                           @input="data.passwordInvalid = v$.password.$invalid" placeholder="密码">
                    <label>密码</label>
                    <div class="invalid-feedback">密码必须是6-12位数字或字母！</div>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control " v-model="data.code"
                           :class="{'is-invalid':data.codeInvalid}"
                           @input="data.codeInvalid = v$.code.$invalid"
                           placeholder="验证码">
                    <label>验证码</label>
                    <div class="invalid-feedback">验证码必须是6位数字或字母！</div>
                </div>
                <div class="form-floating mb-3 float-start">
                    <img id="image" :src="data.captchaImageUrl" @click="getCaptchaImage()" class="img-fluid"
                         alt="验证码">
                </div>
                <button class="w-100 btn btn-lg btn-primary" @click="login()">登录</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import swal from 'sweetalert'
import {getCurrentInstance, onMounted, reactive} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import {alphaNum, maxLength, minLength, required} from '@vuelidate/validators'

const {proxy} = getCurrentInstance()
const data = reactive({
    uid: '',
    password: '',
    code: '',
    captchaImageUrl: '',
    uidInvalid: false,
    passwordInvalid: false,
    codeInvalid: false
});
const rules = {
    uid: {required, maxLength: maxLength(9), minLength: minLength(9)},
    password: {required, alphaNum, maxLength: maxLength(12), minLength: minLength(6)},
    code: {required, alphaNum, maxLength: maxLength(5), minLength: minLength(5)}
};
const v$ = useVuelidate(rules, data);

onMounted(() => {
    getCaptchaImage()
})

function login() {
    proxy.$axios.post('/user/login',
            {uid: data.uid, password: data.password, code: data.code},
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).then(response => {
        let code = response.data.code;
        if (code === -1) {
            swal("验证码错误", {buttons: false, timer: 1000, icon: "warning"})
        } else if (code === -2) {
            swal("账号不存在", {buttons: false, timer: 1000, icon: "warning"});
        } else if (code === -3) {
            swal("密码错误", {buttons: false, timer: 1000, icon: "warning"});
        } else if (code === 1) {
            swal("登录成功", {buttons: false, timer: 1000, icon: "success"});
            sessionStorage.setItem('userJSON', JSON.stringify(response.data.userJSON))
            setTimeout(function () {
                if (response.data.userFlag === 0) {
                    proxy.$router.replace('/admin/book.jsp');
                } else {
                    proxy.$router.replace('/shopping/index');
                }
            }, 1300);
            return;
        } else {
            swal("错误", {buttons: false, timer: 1000, icon: "error"});
        }
        getCaptchaImage()
    })
}

function getCaptchaImage() {
    proxy.$axios.post('/photo/captcha.jpg').then(response => {
        data.captchaImageUrl = 'data:image/png;base64,' + response.data
    })
}

</script>

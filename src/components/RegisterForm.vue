<template>
    <div class="container">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <div class="col-3"></div>
        </header>
        <div class="carousel slide container row">
            <div class="col-md-7">
                <img src="../assets/image/login.png" alt="...">
            </div>
            <div class="col-md-4" style="margin-top: 30px;margin-left: 50px">
                <div class="form-floating mb-3">
                    <a class="btn btn-light" href="/login" role="button" aria-disabled="true">登录</a>
                    <a class="btn btn-light disabled" role="button" aria-disabled="true">注册</a>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" v-model="data.uid"
                           :class="{'is-invalid':data.uidInvalid}"
                           @input="data.uidInvalid = v$.uid.$invalid">
                    <label>账号</label>
                    <div class="invalid-feedback">账号必须是9位数字！</div>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" v-model="data.password"
                           :class="{'is-invalid':data.passwordInvalid}"
                           @input="passwordInvalid">
                    <label>密码</label>
                    <div class="invalid-feedback">密码必须是6-12位数字或字母！</div>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" v-model="data.rePassword"
                           :class="{'is-invalid':data.rePasswordInvalid}"
                           @input="rePasswordInvalid">
                    <label>再次输入密码</label>
                    <div class="invalid-feedback">重复密码必须和密码相同！</div>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" v-model="data.code"
                           :class="{'is-invalid':data.codeInvalid}"
                           @input="data.codeInvalid = v$.code.$invalid">
                    <label>验证码</label>
                    <div class="invalid-feedback">验证码必须是6位数字或字母！</div>
                </div>
                <div class="form-floating mb-3 float-start">
                    <img id="image" :src="data.captchaImageUrl" @click="getCaptchaImage" class="img-fluid" alt="验证码">
                </div>
                <button class="w-100 btn btn-lg btn-primary" @click="register">注册</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import swal from 'sweetalert'
import {getCurrentInstance, onMounted, reactive} from 'vue'
import {useVuelidate} from '@vuelidate/core'
import {alphaNum, maxLength, minLength, required, sameAs} from '@vuelidate/validators'

const {proxy} = getCurrentInstance()
const data = reactive({
    uid: '',
    password: '',
    rePassword: '',
    code: '',
    captchaImageUrl: '',
    uidInvalid: false,
    passwordInvalid: false,
    rePasswordInvalid: false,
    codeInvalid: false
});
const rules = {
    uid: {required, maxLength: maxLength(9), minLength: minLength(9)},
    password: {required, alphaNum, maxLength: maxLength(12), minLength: minLength(6)},
    rePassword: sameAs(data.password),
    code: {required, alphaNum, maxLength: maxLength(6), minLength: minLength(6)}
};
const v$ = useVuelidate(rules, data);

onMounted(() => {
    getCaptchaImage()
})

function register() {
    proxy.$axios.post('/user/register',
            {uid: data.uid, password: data.password, rePassword: data.rePassword, code: data.code},
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).then(response => {
        if (response.data === -1) {
            swal("验证码错误", {buttons: false, timer: 1000, icon: "warning"});
        } else if (response.data === -2) {
            swal("两次密码不同", {buttons: false, timer: 1000, icon: "warning"});
        } else if (response.data === -3) {
            swal("该账号已存在", {buttons: false, timer: 1000, icon: "warning"});
        } else if (response.data === 1) {
            swal("注册成功", {buttons: false, timer: 1000, icon: "success"});
            setTimeout(function () {
                proxy.$router.replace('/login');
            }, 1300);
            return;
        } else {
            swal("错误", {buttons: false, timer: 1000, icon: "error"});
        }
        getCaptchaImage()
    })
}
function passwordInvalid() {
    data.passwordInvalid = v$.value.password.$invalid
    rePasswordInvalid()
}
function rePasswordInvalid() {
    if (data.password !== data.rePassword) {
        data.rePasswordInvalid = true;
    } else {
        data.rePasswordInvalid = false;
    }
}

function getCaptchaImage() {
    proxy.$axios.post('/photo/captcha.jpg').then(response => {
        data.captchaImageUrl = 'data:image/png;base64,' + response.data
    })
}
</script>
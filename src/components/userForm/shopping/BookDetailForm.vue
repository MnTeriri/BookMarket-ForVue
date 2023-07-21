<template>
    <div class="container" v-if="data.book">
        <HeaderForm/>
        <div class="row">
            <div class="col-5 flex-wrap align-items-center justify-content-center">
                <img :src="'data:image/png;base64,'+ data.book.imageString" style="height: 300px;width: 300px">
            </div>
            <div class="col-5">
                <div>
                    <label style="font-size: 30px;margin-bottom: 8px">{{ data.book.bname }}</label><br>
                    <label>描述：</label><br>
                    <span>作者：{{ data.book.author }}</span><br>
                    <span>出版社：{{ data.book.publisher }}</span><br>
                    <p>抢购价格：￥<span style="color: red;font-size: 40px" id="price">{{ data.book.price }}</span></p>
                </div>
                <div class="row mb-2">
                    <button type="button" class="btn btn-danger" @click="addCart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             class="bi bi-cart-plus" viewBox="0 0 16 16">
                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                        加入购物车
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {getCurrentInstance, onMounted, reactive} from "vue";
import swal from 'sweetalert'
import HeaderForm from "@/components/userForm/HeaderForm.vue";

const {proxy} = getCurrentInstance()
const data = reactive({
    book: '',
    bid: ''
})
onMounted(() => {
    data.bid = proxy.$route.query.id
    getBookDetail()
})

function getBookDetail() {
    proxy.$axios.post('/book/bookDetail', {bid: data.bid}).then(response => {
        data.book = response.data
    })
}

function addCart() {
    proxy.$axios.post('/cart/addCart', {bid: data.bid}).then(response => {
        if (response.data === -2) {
            swal('书籍库存不足', {buttons: false, timer: 1000, icon: "warning"});
        } else if (response.data === -1) {
            swal('书籍下架或缺货', {buttons: false, timer: 1000, icon: "warning"});
        } else if (response.data === 1) {
            swal("添加成功", {buttons: false, timer: 1000, icon: "success"});
        } else {
            swal('错误', {buttons: false, timer: 1000, icon: "error"});
        }
    });
}
</script>
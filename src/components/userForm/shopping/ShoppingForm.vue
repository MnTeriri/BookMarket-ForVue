<template>
    <div class="container">
        <HeaderForm :shopping-data="data" @getBookList="getBookList"/>
        <CategoryMenu :shopping-data="data" @getBookList="getBookList"/>
        <ShoppingList :shopping-data="data" @getBookList="getBookList"/>
    </div>
</template>
<script setup>
import ShoppingList from "@/components/userForm/shopping/ShoppingList.vue";
import CategoryMenu from "@/components/userForm/shopping/CategoryMenu.vue";
import {getCurrentInstance, onMounted, reactive} from "vue";
import HeaderForm from "@/components/userForm/HeaderForm.vue";

const {proxy} = getCurrentInstance()
const data = reactive({
    bookList: [],
    categoryList: [],
    selectedCid: 1,
    selectedPage: 1,
    totalPage: 1,
    searchName: ''
});
onMounted(() => {
    getBookList('', 1, 1)
    getCategoryList()
})

function getBookList(bname, cid, page) {
    data.searchName = bname
    data.selectedCid = cid
    data.selectedPage = page
    proxy.$axios.post('/book/bookList', {bname: bname, cid: cid, page: page}).then(response => {
        data.bookList = response.data.bookList
        data.totalPage = response.data.totalPage
    })
}

function getCategoryList() {
    proxy.$axios.post('/category/categoryList').then(response => {
        data.categoryList = response.data
    })
}
</script>
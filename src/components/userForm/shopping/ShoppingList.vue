<template>
    <div class="container-fluid text-center">
        <div class="row row-cols-1 row-cols-md-4">
            <div class="col" v-for="book in shoppingData.bookList" :key="book.id">
                <div class="card mb-4" style="height: 460px">
                    <img style="height: 300px" :src="'data:image/png;base64,'+book.imageString" class="card-img-top">
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">￥{{ book.price }}</li>
                            <li class="list-group-item" style="margin-top: 15px">
                                <RouterLink :to="{path:'bookDetail',query:{'id':book.bid}}">{{book.bname }}</RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <ul class="pagination justify-content-end">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous" @click="previousButton">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <template v-for="item in shoppingData.totalPage" :key="item">
                <li class="page-item" aria-current="page" v-if="item===shoppingData.selectedPage">
                    <span class="page-link active"
                          @click="$emit('getBookList',shoppingData.searchValue,shoppingData.selectedCid,item)">{{item }}</span>
                </li>
                <li class="page-item" aria-current="page" v-else>
                    <span class="page-link"
                          @click="$emit('getBookList',shoppingData.searchValue,shoppingData.selectedCid,item)">{{item }}</span>
                </li>
            </template>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next" @click="nextButton">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import {defineEmits, defineProps} from "vue";

const data = defineProps(['shoppingData'])
const emit = defineEmits(['getBookList'])

function previousButton() {
    let selectedPage = data.shoppingData.selectedPage;
    if (selectedPage > 1) {
        emit('getBookList', data.shoppingData.searchValue, data.shoppingData.selectedCid, selectedPage - 1)
    }
}

function nextButton() {
    let selectedPage = data.shoppingData.selectedPage;
    if (selectedPage < data.shoppingData.totalPage) {
        emit('getBookList', data.shoppingData.searchValue, data.shoppingData.selectedCid, selectedPage + 1)
    }
}
</script>

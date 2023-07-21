<template>
    <ul class="nav nav-tabs mb-4">
        <li class="nav-item">
            <a class="nav-link disabled">书籍分类</a>
        </li>
        <template v-for="category in shoppingData.categoryList" :key="category.id">
            <li class="nav-item">
                <a class="nav-link" :class="{'active':category.id===shoppingData.selectedCid}"
                   @click="$emit('getBookList','',category.id,1)">{{ category.cname }}</a>
            </li>
        </template>
    </ul>
</template>
<script setup>
import {defineEmits, defineProps} from "vue";

defineProps(['shoppingData'])
defineEmits(['getBookList'])


</script>
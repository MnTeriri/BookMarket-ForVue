<template>
    <div>
        afdjadf
    </div>
</template>
<script setup>
import {ref, defineExpose} from 'vue'

const a = 1
const b = ref(2)

// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({a, b})
console.log("1"+new Date())
</script>
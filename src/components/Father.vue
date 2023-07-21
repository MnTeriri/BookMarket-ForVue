<template>
    <Child ref="child" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Child from "@/components/Child.vue";
const child = ref(null)

onMounted(() => {
    // child.value 是 <Child /> 组件的实例
    console.log(child.value.b)
    console.log("2"+new Date())
})
</script>
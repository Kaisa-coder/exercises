<template>
    <ul class="eui-option__children">
        <TreeSelectNode :data="child" v-for="child in children" />
    </ul>
</template>

<script setup>
import TreeSelectNode from './tree-select-node.vue'
const props = defineProps(['children'])
</script>
<style>

</style>
<template>
    <li class="eui-option eui-option--tree" :class="{ expand: isExpand }">
        <div class="eui-option__node" :class="{ 'no-children': !hasChildren }">
            <div class="eui-option__expand-icon" :class="{ expand: isExpand }" v-if="hasChildren"
                @click="isExpand = !isExpand">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="12">
                    <path fill="currentColor"
                        d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z">
                    </path>
                </svg>
            </div>
            <span class="eui-option__label" :class="labelClass(data)" @click="onCLick(data)" ref="labelRef">{{ data[labelKey] }}</span>
        </div>
        <TreeSelectChildren v-if="hasChildren" :children="data.children" />
    </li>
</template>

<script setup>
import { ref, computed, inject, watchEffect } from 'vue'
import TreeSelectChildren from './tree-select-children.vue'

const labelRef = ref(null)


const props = defineProps(['data'])

const hasChildren = computed(() => {
    return props.data?.children?.length > 0
})

const isExpand = ref(true)
const setCurrent = inject('setCurrent')
const current = inject('current')
const close = inject('close')
const idKey = inject('idKey')
const labelKey = inject('labelKey')

function labelClass(data) {
    return { active: current.value[idKey] == data[idKey] }
}

watchEffect(()=>{
    if(current.value[idKey] == props.data[idKey]) {
        if (labelRef.value) {
            labelRef.value.scrollIntoView()
        }
        
    }
})

function onCLick(data) {
    setCurrent(data)
    close()
}

</script>
<style>

</style>
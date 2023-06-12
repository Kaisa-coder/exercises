<template>
    <div class="eui-select eui-select--tree" ref="rootRef">
        <div class="eui-select__view">
            <input class="eui-select__input" type="text" :required="required" placeholder="请选择" @click.self="onFocus"
                :value="current[labelKey]" :disabled="disabled">
            <div class="eui-select__label" :class="{ disabled }">{{ current[labelKey] }}</div>
            <div class="eui-select__suffix" :class="{ disabled }">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"
                    class="arco-icon arco-icon-down arco-select-view-arrow-icon" stroke-width="4" stroke-linecap="butt"
                    stroke-linejoin="miter">
                    <path d="M39.6 17.443 24.043 33 8.487 17.443"></path>
                </svg>
            </div>
        </div>
        <teleport to="body">
            <ul class="eui-select__list" v-if="isOpen" :style="ulStyle" ref="ulRef">
                <TreeSelectNode :data="item" v-for="item in data" />
            </ul>
        </teleport>
</div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect, watch, provide, onMounted, onUnmounted } from 'vue'
import { dfsTraverse } from '../../utils'
import TreeSelectNode from './tree-select-node.vue'

const props = defineProps(['data', 'modelValue', 'idKey', 'labelKey', 'required', 'disabled'])
const emit = defineEmits(['update:modelValue'])

const current = ref({})
const isOpen = ref(false)

// 外部设置时
watch(() => props.modelValue, (value) => {
    // console.log('value change', value)
    if (Array.isArray(props.data)) {
        props.data.forEach(root => {
            dfsTraverse(root, node => {
                if (node[props.idKey] == value) {
                    current.value = node
                }
            })
        })
    }
}, {
    immediate: true
})

function setCurrent(cur) {
    current.value = cur
    emit('update:modelValue', cur[props.idKey])
}

function onFocus() {
    isOpen.value = true
}

function close() {
    isOpen.value = false
}



let rootRef = ref(null)
let ulRef = ref(null)

let pos = reactive({
    x: 0,
    y: 0,
    width: 0,
})

let ulStyle = computed(() => {
    return {
        width: pos.width + 'px',
        left: pos.x + 'px',
        top: pos.y + 'px',
    }
})

function updateUlStyle() {
    if (rootRef.value != null) {
        let { left, top, width } = rootRef.value.getBoundingClientRect()
        pos.width = width
        pos.x = left
        pos.y = top + 34
    }
}

watchEffect(() => {
    if (isOpen.value) {
        updateUlStyle()
    }
})


function handlerResize() {
    updateUlStyle()
}


function eventHandler(event) {
    let target = event.target.closest('.eui-select__list')
    let inInput = event.target.closest('.eui-select--tree')
    if (!target && !inInput) {
        close()
    }
}


onMounted(() => {
    window.addEventListener('click', eventHandler)
    window.addEventListener('resize', handlerResize)
})

onUnmounted(() => {
    window.removeEventListener('click', eventHandler)
    window.removeEventListener('resize', handlerResize)
})




provide('setCurrent', setCurrent)
provide('close', close)
provide('current', current)
provide('idKey', props.idKey)
provide('labelKey', props.labelKey)


</script>


<style>
.eui-select--tree {
    width: 100%;
}


.eui-option--tree {
    height: auto;
    padding: 0;
}

.eui-option--tree:hover {
    background: none;
}

.eui-option__children {
    display: none;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: 2em;
}

.eui-option--tree.expand>.eui-option__children {
    display: block;
}


.eui-option__label {
    margin-left: 0px;
    flex: 1;
}

.eui-option__label.active {
    color: var(--primary);
}

.eui-option__expand-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    cursor: pointer;
}

.eui-option__expand-icon.expand {
    transform: rotate(90deg);
}

.eui-option__node {
    display: flex;
    align-items: center;
    padding: 0 8px;
}

.eui-option__node.no-children {
    margin-left: 20px;
}

.eui-option__node:hover {
    background-color: #F2F3F5;
}
</style>
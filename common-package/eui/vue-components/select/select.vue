<template>
    <div class="eui-select" ref="rootRef">
        <div class="eui-select__view">
            <input class="eui-select__input" @focus="onFocus" type="text" readonly placeholder="请选择"
                v-model="selectValue" />
            <div class="eui-select__label">{{ labelValue }}</div>
            <div class="eui-select__suffix">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"
                    class="arco-icon arco-icon-down arco-select-view-arrow-icon" stroke-width="4" stroke-linecap="butt"
                    stroke-linejoin="miter">
                    <path d="M39.6 17.443 24.043 33 8.487 17.443"></path>
                </svg>
            </div>
        </div>
        <teleport to="body">
            <ul class="eui-select__list" v-show="isOpen" :style="ulStyle">
                <slot></slot>
            </ul>
        </teleport>
    </div>
</template>

<script setup>
import { ref, reactive, computed, provide, watchEffect, onUnmounted, onMounted } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const options = ref([])
const selectValue = ref(props.modelValue)
const labelValue = ref('')

const isOpen = ref(false)
let rootRef = ref(null)


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
        pos.y = top + 32
    }
}

watchEffect(() => {
    if (isOpen.value) {
        updateUlStyle()
    }
})


function findLabel(value) {
    for (const item of options.value) {
        if (item.value == value) {
            return {
                label: item.label,
                value: item.value,
            }
        }
    }
}

function setCurrent({ label, value }) {
    labelValue.value = label
    selectValue.value = value

    emit('update:modelValue', value)
}

watchEffect(() => {
    if (options.value.length > 0) {
        const finded = findLabel(props.modelValue)
        if (finded) {
            setCurrent(finded)
        }
    }
})

function addOption(opt) {
    options.value.push(opt)
}

function open() {
    document.body.click()
    if (options.value.length > 0) {
        isOpen.value = true
    }
}

function onFocus(event) {
    open()
}


function close() {
    isOpen.value = false
}


function eventHandler(event) {
    let target = event.target.closest('.eui-select')
    if (!target) {
        close()
    }
}


function handlerResize() {
    updateUlStyle()
}

onMounted(() => {
    window.addEventListener('click', eventHandler)
    window.addEventListener('resize', handlerResize)
})

onUnmounted(() => {
    window.removeEventListener('click', eventHandler)
    window.removeEventListener('resize', handlerResize)
})

provide('close', close)
provide('addOption', addOption)
provide('setCurrent', setCurrent)
provide('selectValue', selectValue)

</script>
<style>
.eui-select {
    min-width: 220px;
    display: inline-flex;
    flex-direction: column;
    position: relative;
}

.eui-select__list {
    position: fixed;
    width: 100%;
    top: 34px;
    list-style: none;
    padding: 0;
    margin: 0;
    background: var(--background);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
    max-height: 220px;
    overflow: auto;
    z-index: 302;
    animation: eui-dropdown-anim 0.15s ease-in;
}

.eui-select .eui-select__input {
    cursor: default;
    font-size: 0;
}

/* .eui-select>input:focus~.eui-select__list {} */

.eui-select__view {
    position: relative;
    height: 30px;
    display: flex;
    background: var(--body-bg);
    outline: none;
}

.eui-select__suffix {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    pointer-events: none;
}
.eui-select__suffix.disabled {
    opacity: 0.2;
}

.eui-select__label {
    position: absolute;
    left: 8px;
    right: 32px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--text-secondary-color);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.eui-select__label.disabled {
    color: var(--text-muted-color);
}
</style>
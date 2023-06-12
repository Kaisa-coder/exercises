<template>
    <div class="eui-details">
        <div class="eui-summary">
            <div class="eui-summary__icon" :class="{ open: isOpen }" @click="isOpen = !isOpen">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="12">
                    <path fill="currentColor"
                        d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z">
                    </path>
                </svg>
            </div>
            <slot name="summary">详细信息</slot>
        </div>
        <template v-if="isOpen">
            <slot></slot>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>
<style>
.eui-summary {
    display: flex;
    align-items: center;
}

.eui-summary__icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    cursor: pointer;
}

.eui-summary__icon.open {
    transform: rotate(90deg);
}
</style>
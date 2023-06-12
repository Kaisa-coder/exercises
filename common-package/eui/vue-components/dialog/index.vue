<template>
  <teleport to="body">
    <transition name="zoom-modal">
      <div class="eui-dialog" v-if="visible">
        <header class="eui-dialog__header">
          <slot name="header">
            <div class="eui-dialog__title">
              {{ title }}
            </div>
          </slot>
          <button class="eui-dialog__close" @click="close()">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="arco-icon arco-icon-close" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter"><path d="M9.857 9.858 24 24m0 0 14.142 14.142M24 24 38.142 9.858M24 24 9.857 38.142"></path></svg>
          </button>
        </header>
        <div class="eui-dialog__body">
          <slot />
        </div>
        <footer class="eui-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </transition>
    <transition name="fade">
      <div class="eui-mask" v-if="visible"></div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps(['title', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

// 防止在弹框上出现滚动条
watch(() => props.modelValue, () => {
  if (props.modelValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.removeAttribute('style')
  }
})

defineExpose({
  open,
  close,
})

function onKeyUp(event) {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keyup', onKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyUp)
})

</script>


<style>
.eui-dialog {
  position: fixed;
  background: #fff;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  z-index: 301;
  border-radius: var(--eui-border-radius);
  max-width: 80%;
  word-wrap: break-word;
  word-break: break-all;
  /* overflow: hidden; */
}

.eui-dialog::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  background: #3459DE;
  filter: blur(50px);
  z-index: 1;
  opacity: 0.5;
  pointer-events: none;
}

.eui-dialog::after {
  content: '';
  display: block;
  position: absolute;
  right: -22px;
  bottom: 0;
  width: 130px;
  height: 30px;
  background: #7757F9;
  filter: blur(30px);
  z-index: 1;
  opacity: 0.3;
  pointer-events: none;
}

.eui-dialog__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color, #D1CAEA);
}

.eui-dialog__title {
  display: flex;
  align-items: center;
}

.eui-dialog__close {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  text-align: center;
  padding: 6px;
  margin-left: 8px;
  background: transparent;
}
.eui-dialog__close:hover {
  background: #F4F7FF;
}

.eui-dialog__body {
  padding: 16px;
  max-height: 560px;
  overflow-y: auto;
  overscroll-behavior-y: contain;
}

.eui-dialog__footer {
  padding: 16px;
  padding-top: 10px;
  text-align: right;
}


/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.1s ease-in;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  top: 8%;
  opacity: 0;
}


.zoom-modal-enter-from {
    transform: translateX(-50%) scale(0.5);
    opacity: 0
}

.zoom-modal-enter-to {
    transform: translateX(-50%) scale(1);
    opacity: 1
}

.zoom-modal-enter-active {
    transition: opacity 0.4s cubic-bezier(0.3,1.3,0.3,1),transform 0.4s cubic-bezier(0.3,1.3,0.3,1)
}

.zoom-modal-leave-from {
    transform: translateX(-50%) scale(1);
    opacity: 1
}

.zoom-modal-leave-to {
    transform: translateX(-50%) scale(0.5);
    opacity: 0
}

.zoom-modal-leave-active {
    transition: opacity 0.3s cubic-bezier(0.3,1.3,0.3,1),transform 0.3s cubic-bezier(0.3,1.3,0.3,1)
}

</style>

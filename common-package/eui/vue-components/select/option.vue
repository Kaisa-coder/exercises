<template>
  <li class="eui-option" :class="getClassName()" @click="onItemClick(value, label)">
    <slot>
      {{ label }}
    </slot>
  </li>
</template>

<script setup>

import { inject } from 'vue'
const props = defineProps(['label', 'value'])

// const emit = defineEmits(['select'])
const close = inject('close')
const addOption = inject('addOption')
const setCurrent = inject('setCurrent')
const selectValue = inject('selectValue')


addOption({
  label: props.label,
  value: props.value,
})


function onItemClick(value, label) {
  // console.log('value', { value, label })
  setCurrent({ value, label })
  close()
}

function getClassName() {
  return {
    active: selectValue.value === props.value
  }
}


</script>
<style>
.eui-option {
  height: 30px;
  line-height: 30px;
  padding: 0 16px;
  cursor: default;
  overflow: hidden;
  text-overflow: ellipsis;
}

.eui-option:hover {
  background-color: #F2F3F5;
}

.eui-option.active {
  background-color: #F0F5FF;
}
</style>
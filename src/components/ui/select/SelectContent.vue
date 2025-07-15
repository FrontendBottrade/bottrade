<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="select?.open"
        ref="contentRef"
        class="fixed inset-0 z-50"
        @mousedown="handleBackdropClick"
      >
        <div
          ref="menuRef"
          class="absolute min-w-[8rem] overflow-hidden rounded-md border bg-white dark:bg-gray-800 shadow-md"
          :style="menuStyle"
        >
          <div class="max-h-[300px] overflow-auto p-1">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted, computed, nextTick } from 'vue'

const select = inject('select')
const contentRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const menuStyle = computed(() => {
  if (!select?.triggerRef) return {}
  
  const rect = select.triggerRef.getBoundingClientRect()
  const menuHeight = menuRef.value?.offsetHeight || 300
  const viewportHeight = window.innerHeight
  const spaceBelow = viewportHeight - rect.bottom
  const spaceAbove = rect.top
  
  const positionBelow = spaceBelow >= menuHeight || spaceBelow >= spaceAbove
  const top = positionBelow ? rect.bottom + 4 : rect.top - menuHeight - 4
  
  return {
    position: 'fixed',
    top: `${top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    maxHeight: `${Math.min(300, positionBelow ? spaceBelow - 10 : spaceAbove - 10)}px`,
    transformOrigin: positionBelow ? 'top' : 'bottom'
  }
})

const handleBackdropClick = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    event.preventDefault()
    event.stopPropagation()
    select?.close()
  }
}

const updatePosition = async () => {
  if (!select?.open || !menuRef.value) return
  await nextTick()
  Object.assign(menuRef.value.style, menuStyle.value)
}

onMounted(() => {
  window.addEventListener('scroll', updatePosition, true)
  window.addEventListener('resize', updatePosition)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
})
</script>

<style>
.select-enter-active,
.select-leave-active {
  transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style> 
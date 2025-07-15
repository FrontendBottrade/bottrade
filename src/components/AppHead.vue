<script setup lang="ts">
import { watch, onMounted } from 'vue'

interface Props {
  title?: string
  description?: string
}

const props = defineProps<Props>()

// Mise à jour du titre de la page
watch(() => props.title, (newTitle) => {
  if (newTitle) {
    document.title = newTitle
  }
}, { immediate: true })

// Mise à jour de la description
watch(() => props.description, (newDescription) => {
  if (newDescription) {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', newDescription)
  }
}, { immediate: true })

onMounted(() => {
  if (props.title) {
    document.title = props.title
  }
  if (props.description) {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', props.description)
  }
})
</script>

<template>
  <!-- Ce composant ne rend rien visuellement -->
</template>

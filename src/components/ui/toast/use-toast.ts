import { ref } from 'vue'

interface ToastOptions {
  title: string;
  description: string;
}

export function useToast() {
  const toastData = ref<ToastOptions | null>(null)

  const toast = (options: ToastOptions) => {
    toastData.value = options
    setTimeout(() => {
      toastData.value = null
    }, 3000)
  }

  return {
    toastData,
    toast
  }
} 
import { reactive, ref } from 'vue'
import type { FormState } from '@/types'

export const useForm = (initialData: any = {}) => {
  const form = reactive<FormState>({
    ...initialData,
    errors: {}
  })

  const processing = ref(false)
  
  const submit = async (callback: () => Promise<void>) => {
    processing.value = true
    try {
      await callback()
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      processing.value = false
    }
  }

  const reset = () => {
    Object.keys(form).forEach(key => {
      if (key !== 'errors') {
        form[key] = initialData[key] || ''
      }
    })
    form.errors = {}
  }

  return {
    form,
    processing,
    submit,
    reset
  }
}

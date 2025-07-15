import { ref, reactive } from 'vue'
import type { User, Auth } from '@/types'

// Données mockées pour l'authentification
const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://via.placeholder.com/32',
  email_verified_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

export const useAuth = () => {
  const auth = reactive<Auth>({
    user: mockUser
  })

  const isAuthenticated = ref(true)

  const login = async (credentials: any) => {
    // Mock login logic
    console.log('Login with:', credentials)
    return Promise.resolve()
  }

  const logout = async () => {
    // Mock logout logic
    console.log('Logout')
    return Promise.resolve()
  }

  const register = async (userData: any) => {
    // Mock register logic
    console.log('Register with:', userData)
    return Promise.resolve()
  }

  return {
    auth,
    isAuthenticated,
    login,
    logout,
    register
  }
}

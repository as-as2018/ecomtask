import { login } from '@/api/productApi.js'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  }),

  actions: {
    async loginUser(credentials) {
      this.loading = true
      this.error = null
      try {
        const response = await login(credentials)

        // Map API response
        this.user = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          gender: response.data.gender,
          image: response.data.image,
        }

        this.accessToken = response.data.accessToken
        this.refreshToken = response.data.refreshToken
        this.isAuthenticated = true

        console.log('Login successful:', response.data)
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed'
        this.isAuthenticated = false
        console.error('Login error:', error)
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      this.isAuthenticated = false
    },
  },

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, key: 'auth-store' }],
  },
})

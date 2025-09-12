import { defineStore } from 'pinia'
import {
  fetchProductsApi,
  fetchAllProductsApi,
  fetchCategoriesApi,
  fetchProductByIdApi,
  searchProductsApi,
  fetchProductsByCategoryApi,
  login
} from '@/api/productApi.js'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: [],
    loading: false,
    error: null,
    currentPage: 1,
    limit: 10,
    total: 0,
    searchQuery: '',
    selectedCategory: '',
    sortBy: 'default'
  }),

  getters: {
    filteredProducts(state) {
      let filtered = [...state.products]

      switch (state.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'name':
          filtered.sort((a, b) => a.title.localeCompare(b.title))
          break
      }
      return filtered
    },

    totalPages(state) {
      return Math.ceil(state.total / state.limit)
    },

    hasNextPage(state) {
      return state.currentPage < this.totalPages
    },

    getSavedProduct(state) {
      return state.products.filter((p) => p?.saved === true)
    }
  },

  actions: {
    async fetchProducts(page = 1) {
      this.loading = true
      this.error = null
      try {
        const skip = (page - 1) * this.limit
        const response = await fetchProductsApi(this.limit, skip)

        if (page === 1) {
          this.products = this.checkWishlist(response.data.products)
        } else {
          this.products = this.checkWishlist([
            ...this.products,
            ...response.data.products
          ])
        }

        this.total = response.data.total
        this.currentPage = page
      } catch (error) {
        this.error = 'Failed to fetch products. Please try again.'
      } finally {
        this.loading = false
      }
    },

    async fetchAllProducts() {
      this.loading = true
      try {
        const response = await fetchAllProductsApi()
        this.products = this.checkWishlist(response.data.products)
        this.total = response.data.total
        this.categories = [
          ...new Set(this.products.map((p) => p.category))
        ].sort()
      } catch (error) {
        this.error = 'Failed to fetch products.'
      } finally {
        this.loading = false
      }
    },

    async fetchAllProductsCategory() {
      this.loading = true
      try {
        const response = await fetchCategoriesApi()
        this.categories = response.data
      } catch (error) {
        this.error = 'Failed to fetch categories.'
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id) {
      try {
        const response = await fetchProductByIdApi(id)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async setSearchQuery(query) {
      this.loading = true
      try {
        const response = await searchProductsApi(query, this.limit)
        this.products = this.checkWishlist(response.data.products)
      } catch (error) {
        this.error = 'Failed to search products.'
      } finally {
        this.loading = false
      }
    },

    async setCategory(category) {
      this.loading = true
      this.selectedCategory = category
      try {
        const response = await fetchProductsByCategoryApi(
          category,
          this.limit
        )
        this.products = this.checkWishlist(response.data.products)
        this.total = response.data.total
      } catch (error) {
        this.error = 'Failed to fetch products by category.'
      } finally {
        this.loading = false
      }
    },

    setSortBy(sortBy) {
      this.sortBy = sortBy
    },

    async loadMore() {
      if (this.hasNextPage && !this.loading) {
        await this.fetchProducts(this.currentPage + 1)
      }
    },

    reset() {
      this.searchQuery = ''
      this.selectedCategory = ''
      this.sortBy = 'default'
      this.currentPage = 1
    },

    toggleWishlist(product) {
      this.products = this.products.map((p) => {
        if (p.id === product.id) {
          p.saved = !p.saved
        }
        return p
      })
    },

    checkWishlist(apiProduct) {
      return apiProduct.map((p) => {
        const prod = this.products.find((prod) => prod.id === p.id)
        p.saved = prod?.saved === true
        return p
      })
    }
  },

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, key: 'product-store' }]
  }
})

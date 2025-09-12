import axios from 'axios'

const BASE_URL = 'https://dummyjson.com/products'


export const login = (payload) =>  axios.post(`https://dummyjson.com/auth/login`,payload);

export const fetchProductsApi = (limit, skip) =>  axios.get(`${BASE_URL}?limit=${limit}&skip=${skip}`)

export const fetchAllProductsApi = () =>  axios.get(`${BASE_URL}?limit=100`)

export const fetchCategoriesApi = () =>  axios.get(`${BASE_URL}/categories`)

export const fetchProductByIdApi = (id) =>  axios.get(`${BASE_URL}/${id}`)

export const searchProductsApi = (query, limit = 10) =>  axios.get(`${BASE_URL}/search?q=${query}&limit=${limit}`)

export const fetchProductsByCategoryApi = (category, limit = 10) =>  axios.get(`${BASE_URL}/category/${category}?limit=${limit}`)

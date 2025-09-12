# EcomTask

An e-commerce application built with Vue 3, designed to provide a seamless shopping experience with features like product browsing, cart management, wishlist, user authentication, and analytics dashboard.

## Features

- Product catalog with search and filtering
- Detailed product pages
- Shopping cart functionality
- Wishlist management
- Dashboard with analytics and charts
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia with persistence
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Charts**: Chart.js with Vue Chart.js
- **Icons**: Iconify

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecomtask
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## Project Structure

```
src/
├── api/           # API service functions
├── assets/        # Static assets
├── components/    # Reusable Vue components
│   ├── UI/        # Base UI components
│   └── ...        # Feature-specific components
├── routers/       # Vue Router configuration
├── stores/        # Pinia stores for state management
├── validators/    # Form validation rules
├── Views/         # Page-level components
├── App.vue        # Root component
├── main.js        # Application entry point
└── style.css      # Global styles
```

## Approach

This application follows a modern Vue 3 architecture using the Composition API for better code organization and reusability. Key design decisions include:

- **Component-Based Architecture**: Modular components for maintainability
- **Centralized State Management**: Pinia stores for cart, auth, products, and theme
- **API Layer**: Separated API logic for better testing and maintainability
- **Responsive Design**: Tailwind CSS for consistent, mobile-first styling
- **Performance**: Vite for fast development and optimized builds
- **Accessibility**: Semantic HTML and ARIA attributes where appropriate

<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="w-full max-w-md bg-card-bg border border-card-border shadow-lg rounded-2xl p-8">
      
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="/logo.png" alt="Logo" class="h-14" />
      </div>

      <!-- Tabs -->
      <div class="flex mb-6">
        <button
          class="w-1/2 py-2 rounded-l-lg"
          :class="isLogin ? 'bg-primary text-white' : 'bg-surface text-text-secondary'"
          @click="isLogin = true"
        >
          Login
        </button>
        <button
          class="w-1/2 py-2 rounded-r-lg"
          :class="!isLogin ? 'bg-primary text-white' : 'bg-surface text-text-secondary'"
          @click="isLogin = false"
        >
          Register
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-4 py-2 rounded-lg border border-border bg-[var(--background-input)] text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-text-primary mb-1">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="w-full px-4 py-2 rounded-lg border border-border bg-[var(--background-input)] text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              required
            />
          </div>

          <!-- Extra field for Register -->
          <div v-if="!isLogin">
            <label class="block text-sm font-medium text-text-primary mb-1">Confirm Password</label>
            <input
              v-model="form.confirmPassword"
              type="password"
              class="w-full px-4 py-2 rounded-lg border border-border bg-[var(--background-input)] text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full mt-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition"
        >
          {{ isLogin ? "Login" : "Register" }}
        </button>
      </form>

      <!-- Switch text -->
      <p class="mt-4 text-center text-sm text-[var(--color-text-secondary)]">
        {{ isLogin ? "Don’t have an account?" : "Already have an account?" }}
        <span
          @click="isLogin = !isLogin"
          class="text-primary cursor-pointer font-semibold"
        >
          {{ isLogin ? "Register" : "Login" }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginRegister",
  data() {
    return {
      isLogin: true,
      form: {
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      if (!this.isLogin && this.form.password !== this.form.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      if (this.isLogin) {
        alert("Login with " + this.form.email);
      } else {
        alert("Register with " + this.form.email);
      }
    }
  }
};
</script>

<style scoped>
/* Smooth transition between login/register */
button {
  transition: all 0.3s ease-in-out;
}
</style>

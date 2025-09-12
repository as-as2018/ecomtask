import { defineStore } from "pinia";

const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "light",
  }),

  getters: {
    getTheme: (state) => state.theme,
  },

  actions: {
    setCurrentTheme(theme) {
      const appDiv = document.getElementById('e-app');
    if (theme) {      
      appDiv.setAttribute('data-theme',theme);
    } else {
      appDiv.setAttribute('data-theme', 'light');
    }
    },
   
    toggleTheme() {
        const appDiv = document.getElementById('e-app');
        console.log(appDiv);
        
        const currentTheme = appDiv.getAttribute('data-theme');
        console.log(currentTheme);
        this.theme = currentTheme === 'light' ? 'dark' : 'light';
        appDiv.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
     
    },
   
   
  },

  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, key: 'theme-store' }
    ]
  }
});

export default useThemeStore;

export default defineNuxtConfig({
  ssr: false,
  components: true,
  app: {
    baseURL: "/",
    head: {
      title: `md-to-pdf`,
      meta: [{ charset: "iso-8859-1" }],     
      link: [
        {
          rel: "icon",
          href: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40AlexanderObregon%2Fwhat-is-markdown-uses-and-benefits-explained-947300e1f955&psig=AOvVaw0SXg6zTwQnjJMrKc0sZcY9&ust=1739928739492000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPjJyeWJzIsDFQAAAAAdAAAAABAf",
        }
      ],
    },
  },
  devServer: {
    https: false,
  },

  nitro: {
    preset: "iis-node",
  },

  build: {
    transpile: ["vee-validate/dist/rules"],
  },

  css: ["~/assets/css/tailwind.css"],
  modules: ['@nuxtjs/tailwindcss'],

  typescript: {
    strict: true,
  },

  imports: {
    dirs: [
      "assets",
      "public",
      "stores",
      "components",
      "composables",
      "composables/*/index.{ts,js,mjs,mts}",
      "composables/**",
      "util/*.{ts,js,mjs,mts}",
    ],
  },

  compatibilityDate: "2025-02-17",
});
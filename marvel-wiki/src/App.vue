<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { KeepAlive } from "vue";
</script>

<template>
  <Header />
  <main class="main">
    <RouterView />
  </main>

  <Footer />
</template>

<style scoped>
.main {
  flex: 1;
  min-height: 90vh;
}
</style>

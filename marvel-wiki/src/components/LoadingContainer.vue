<template>
  <div class="spinner-container">
    <FontAwesomeIcon :icon="faSpinner" spin class="spinner" />
    <h3 class="loading-text">Carregando...</h3>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faSpinner);
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 300px;
  background-color: rgb(0, 0, 0, 0.5);
  border-radius: 50px;
}

.spinner {
  font-size: 3rem;
  color: #3b82f6;
}

.loading-text {
  color: #fff;
}

</style>

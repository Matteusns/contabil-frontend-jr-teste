<template>
    <div class="search-controls">
      <p>
        Mostrando {{ filteredLength }} de {{ totalCharacters }} personagens
      </p>
      <div>
        <label for="buscar">Buscar </label>
        <input
          id="buscar"
          type="text"
          @input="$emit('update:modelValue', $event.target.value)"
          :disabled="loading"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    loading: Boolean,
    totalCharacters: Number,
    filteredLength: Number,
  });
  </script>
  
  <style scoped>
  .search-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  
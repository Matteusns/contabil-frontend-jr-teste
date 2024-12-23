<template>
    <div class="card" @click="navigateToDetail">
      <img :src="image" :alt="name" class="card-image" />
      <div class="card-title">
        {{ name }}
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    name: String,
    image: String,
  });

  </script>
  
  <style scoped>
  .card {
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
  }
  
  .card-image {
    width: 100%;
    height: 300px;
    object-fit: fit;
  }
  
  .card-title {
    position: absolute;
    bottom: 0;
    background-color: #202020;
    color: #fff;
    min-height: 40px;
    padding: 10px;
    width: 100%;
    font-size: 20px;
    font-weight: 700;
  }
  </style>
  
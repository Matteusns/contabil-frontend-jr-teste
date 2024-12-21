<template>
    <div class="container">
      <div v-if="loading">Loading...</div>
      <div v-else>
        <img :src="getThumbnail(character)" :alt="character.name" class="hero-img" />
        <h1>{{ character.name }}</h1>
        <p>{{ character.description || 'No description available' }}</p>
        <button @click="goBack">Back to List</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getCharacterById } from '../services/marvelApi';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const character = ref(null);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
      const response = await getCharacterById(route.params.id);
      character.value = response.data.data.results[0];
    } catch (error) {
      console.error('Failed to fetch character details', error);
    } finally {
      loading.value = false;
    }
  });
  
  const getThumbnail = (character) => {
    return `${character.thumbnail.path}.${character.thumbnail.extension}`;
  };
  
  const goBack = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    padding: 40px;
  }
  
  .hero-img {
    width: 300px;
    border-radius: 8px;
  }
  
  h1 {
    margin: 20px 0;
  }
  
  p {
    max-width: 800px;
    margin: 0 auto 20px;
    line-height: 1.6;
  }
  
  button {
    padding: 10px 20px;
    background-color: #e62429;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  button:hover {
    background-color: #c71d23;
  }
  </style>
  
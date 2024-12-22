<template>
  <div class="container">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div>
        <h1>Personagens da MARVEL</h1>
        <div class="search-controls">
          <p>Mostrando 10 de {{ totalCharacters }} personagens</p>
          <div>
            <label for="">Buscar </label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div class="characters-grid">
        <CardHero
          v-for="character in characters"
          :key="character.id"
          :id="character.id"
          :name="character.name"
          :image="`${character.thumbnail.path}.${character.thumbnail.extension}`"
          :description="character.description"
        />
      </div>
      <PaginationButtons
        :handleNextPage="handleNextPage"
        :handlePrevPage="handlePrevPage"
        :pageNumber="pageNumber"
        :isLoading="loadingPagination"
        :totalCharacters="totalCharacters"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCharacters } from "../services/marvelApi";
import CardHero from "@/components/CardHero.vue";
import PaginationButtons from "@/components/PaginationButtons.vue";

const characters = ref([]);
const totalCharacters = ref(0);
const pageNumber = ref(0);
const loading = ref(true);
const loadingPagination = ref(false);

onMounted(async () => {
  fetchCharacters();
});

const fetchCharacters = async () => {
  try {
    loadingPagination.value = true;
    const response = await getCharacters(pageNumber.value);
    console.log(response)
    totalCharacters.value = response.data.data.total;
    characters.value = response.data.data.results;
  } catch (error) {
    console.error("Erro ao buscar personagens", error);
  } finally {
    loading.value = false;
    loadingPagination.value = false;
  }
};

const handleNextPage = () => {
  pageNumber.value = pageNumber.value + 1;
  fetchCharacters()
};

const handlePrevPage = () => {
  if(pageNumber != 0 ) {
    pageNumber.value --
  }

  fetchCharacters()
};
</script>

<style scoped>
.characters-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 cards por linha */
  gap: 20px;
  margin-top: 20px;
}

.search-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-controls input {
  border-radius: 5px;
  border: 1px solid #000;
  height: 25px;
}

@media (max-width: 1280px) {
  .characters-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1024px) {
  .characters-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .characters-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .characters-grid {
    grid-template-columns: 1fr;
  }
}
</style>

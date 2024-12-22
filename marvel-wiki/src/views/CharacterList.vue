<template>
  <div class="container">
    <div>
      <div>
        <h1>Personagens da MARVEL</h1>
        <div class="search-controls">
          <p>
            Mostrando {{ filteredCharacters.length && "15" }} de
            {{ totalCharacters }} personagens
          </p>
          <div>
            <label for="buscar">Buscar </label>
            <input
              id="buscar"
              type="text"
              v-model="searchText"
              :disabled="loading"
            />
          </div>
        </div>
      </div>
      <div class="characters-grid">
        <CardHero
          v-for="character in filteredCharacters"
          :key="character.id"
          :id="character.id"
          :name="character.name"
          :image="`${character.thumbnail.path}.${character.thumbnail.extension}`"
          :description="character.description"
        />
        <LoadingContainer v-if="loading" />
      </div>
      <PaginationButtons
        :handleNextPage="handleNextPage"
        :handlePrevPage="handlePrevPage"
        :pageNumber="pageNumber"
        :isLoading="loading"
        :totalCharacters="totalCharacters"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getCharacters } from "../services/marvelApi";
import CardHero from "@/components/CardHero.vue";
import PaginationButtons from "@/components/PaginationButtons.vue";
import LoadingContainer from "@/components/LoadingContainer.vue";

const characters = ref([]);
const totalCharacters = ref(0);
const pageNumber = ref(0);
const searchText = ref("");
const loading = ref(false);

onMounted(async () => {
  fetchCharacters();
});

const fetchCharacters = async () => {
  try {
    loading.value = true;
    const response = await getCharacters(pageNumber.value);
    totalCharacters.value = response.data.data.total;
    characters.value = response.data.data.results;
  } catch (error) {
    console.error("Erro ao buscar personagens", error);
  } finally {
    loading.value = false;
    scrollTop();
  }
};

const filteredCharacters = computed(() => {
  if (!searchText.value) {
    return characters.value;
  }
  return characters.value.filter((character) =>
    character.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

const handleNextPage = () => {
  pageNumber.value = pageNumber.value + 1;
  fetchCharacters();
};

const handlePrevPage = () => {
  if (pageNumber != 0) {
    pageNumber.value--;
  }

  fetchCharacters();
};

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style scoped>
.characters-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 cards por linha */
  gap: 20px;
  margin-top: 20px;
  padding: 40px;
  min-height: 300px;
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

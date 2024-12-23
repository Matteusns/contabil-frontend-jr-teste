<template>
  <div class="container">
    <div>
      <div class="search-area">
        <div class="margin-b-40">
          <h1>Personagens da MARVEL</h1>
          <span>Clique nos personagens para ver mais informações</span>
        </div>
        <SearchControls
          v-model="searchText"
          :loading="loading"
          :totalCharacters="totalCharacters"
          :filteredLength="filteredCharacters.length"
        />
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
import CardHero from "@/components/CharacterList/CardHero.vue";
import PaginationButtons from "@/components/CharacterList/PaginationButtons.vue";
import LoadingContainer from "@/components/LoadingContainer.vue";
import SearchControls from "@/components/CharacterList/SearchControls.vue";

const characters = ref([]);
const charactersOnPage = ref([]);
const totalCharacters = ref(0);
const pageNumber = ref(0);
const searchText = ref("");
const loading = ref(false);
const charactersPerPage = 15;

onMounted(async () => {
  fetchCharacters();
});

const fetchCharacters = async () => {
  try {
    loading.value = true;
    const response = await getCharacters(pageNumber.value);

    characters.value.push(...response.data.data.results);
    totalCharacters.value = response.data.data.total;

    updateCharactersOnPage();
  } catch (error) {
    console.error("Erro ao buscar personagens", error);
  } finally {
    loading.value = false;
  }
};

const filteredCharacters = computed(() => {
  if (!searchText.value) {
    return charactersOnPage.value;
  }
  return charactersOnPage.value.filter((character) =>
    character.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

const updateCharactersOnPage = () => {
  const start = pageNumber.value * charactersPerPage;
  const end = start + charactersPerPage;
  charactersOnPage.value = characters.value.slice(start, end);
  scrollTop();
};

const handleNextPage = () => {
  const nextPage = pageNumber.value + 1;
  const start = nextPage * charactersPerPage;

  if (start >= characters.value.length) {
    pageNumber.value = nextPage;
    fetchCharacters();
  } else {
    pageNumber.value = nextPage;
    updateCharactersOnPage();
  }
};

const handlePrevPage = () => {
  if (pageNumber.value > 0) {
    pageNumber.value--;
    updateCharactersOnPage();
  }
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
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px 40px;
  min-height: 300px;
}
.margin-b-40 {
  margin-bottom: 40px;
}

.search-area {
  padding: 0 40px;
}

.search-area h1 {
  margin-bottom: 0;
}

.search-area span {
  color: #6c757d;
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
  .search-controls {
    padding: 0;
  }
  .characters-grid {
    padding: 10px;
  }
}
</style>

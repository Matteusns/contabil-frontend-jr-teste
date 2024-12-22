<template>
  <div class="pagination-buttons">
    <button
      class="btn btn-primary btn-voltar"
      @click="handlePrevPage"
      :disabled="pageNumber === 0 || isLoading"
    >
      <FontAwesomeIcon :icon="faArrowLeft" /> Voltar
    </button>
    <p>Pagina {{ pageNumber + 1 }} de {{ maxPages }}</p>
    <button
      class="btn btn-primary btn-proximo"
      @click="handleNextPage"
      :disabled="isLastPage || isLoading"
    >
      Proximo <FontAwesomeIcon :icon="faArrowRight" />
    </button>
  </div>
</template>
<script setup>
const props = defineProps({
  isLoading: Boolean,
  pageNumber: Number,
  totalCharacters: Number,
  handleNextPage: {
    type: Function,
    required: true,
  },
  handlePrevPage: {
    type: Function,
    required: true,
  },
});

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { computed } from "vue";

library.add(faArrowRight, faArrowLeft);

const maxPages = computed(() => {
  return Math.round(props.totalCharacters / 10);
});

const isLastPage = computed(() => {
  const maxPage = Math.ceil(props.totalCharacters / 10) - 1;
  return props.pageNumber >= maxPage;
});
</script>
<style scoped>
.pagination-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.btn-voltar {
  margin-left: 30px;
}

.btn-proximo {
  margin-right: 30px;
}
</style>

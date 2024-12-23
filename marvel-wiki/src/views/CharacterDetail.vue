<template>
  <div class="container">
    <div class="btn-voltar">
      <button class="btn btn-red" @click="goBack">Voltar</button>
    </div>
    <LoadingContainer v-if="loading" />
    <div v-else>
      <div v-if="character" class="container-hero">
        <div class="hero-img">
          <ImageHero
            :image="`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`"
            :name="character?.name"
          />
        </div>
        <div class="hero-desc">
          <h1>{{ character?.name }}</h1>
          <p>{{ character?.description || "Nenhuma descrição disponível" }}</p>
        </div>
      </div>
      <div class="container-extra">
        <div class="quadrinhos">
          <h1>Quadrinhos Relacionados</h1>
          <ul class="lista-quadrinhos" v-if="character?.comics?.items?.length">
            <li v-for="comic of character.comics.items">{{ comic.name }}</li>
          </ul>
          <p v-else>Nenhuma informação disponível</p>
        </div>

        <div class="series">
          <h1>Series Relacionadas</h1>
          <ul class="lista-quadrinhos" v-if="character?.series?.items?.length">
            <li v-for="serie of character.series.items">{{ serie.name }}</li>
          </ul>
          <p v-else>Nenhuma informação disponível</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { getCharacterById } from "../services/marvelApi";
import { useRoute, useRouter } from "vue-router";
import ImageHero from "@/components/CharacterDetail/ImageHero.vue";
import LoadingContainer from "@/components/LoadingContainer.vue";

const route = useRoute();
const router = useRouter();
const character = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await getCharacterById(route.params.id);
    character.value = response.data.data.results[0];
  } catch (error) {
    console.error("Falha ao buscar dados", error);
  } finally {
    loading.value = false;
  }
});

const goBack = () => {
  router.push("/");
};

</script>

<style scoped>
.container-hero {
  background-color: #ddd;
  padding: 40px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.hero-img {
  width: 300px;
  border-radius: 8px;
}

.hero-desc {
  flex: 1;
  padding: 0 30px;
}

p {
  line-height: 1.6;
}

.container-extra {
  background-color: #202020;
  color: #fff;
  padding: 0 40px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.container-extra div {
  flex: 1;
}

.btn-voltar {
  padding: 20px 40px;
  display: flex;
  justify-content: right;
}
</style>

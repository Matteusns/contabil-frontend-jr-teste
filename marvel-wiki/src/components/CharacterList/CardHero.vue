<template>
  <div class="card" @click="navigateToDetail">
    <img :src="image" :alt="name" class="card-image" />
    <div class="card-title">
      {{ name }}
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  id: Number,
  name: String,
  image: String,
  description: String,
  isLoading: Boolean,
});
const router = useRouter();

const navigateToDetail = () => {
  router.push(`/character/${props.id}`);
};
</script>

<style scoped>
.card {
  cursor: pointer;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
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

.card-title h3 {
  margin: 0;
}
</style>

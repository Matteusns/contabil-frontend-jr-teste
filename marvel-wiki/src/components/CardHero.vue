<template>
  <div class="card" @click="navigateToDetail">
    <img :src="image" :alt="name" class="card-image" />
    <div class="card-body">
      <h3 class="card-title">{{ name }}</h3>
      <p class="card-description">
        {{ resumeDescription }}
      </p>
    </div>
    <div class="card-footer">Ver mais detalhes</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  id: Number,
  name: String,
  image: String,
  description: String,
});
const router = useRouter();

const resumeDescription = computed(() => {
  return props.description && props.description.length > 100
    ? props.description.slice(0, 100) + "..."
    : props.description || "Sem descrição disponível";
});

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

.card-body {
  padding: 10px;
  margin-bottom: 50px;
  min-height: 210px;
}

.card-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
}

.card-footer {
  padding: 15px 0;
  width: 100%;
  line-break: auto;
  background-color: #f9fafb;
  text-align: center;
  font-size: 13px;
  color: #6b7280;
  bottom: 0%;
  position: absolute;
}
</style>

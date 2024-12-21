import { createRouter, createWebHistory } from 'vue-router'
import CharacterList from '../views/CharacterList.vue'
import CharacterDetail from '../views/CharacterDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: CharacterList,
    },
    {
      path: '/about',
      component: CharacterDetail,
    },
  ],
})

export default router

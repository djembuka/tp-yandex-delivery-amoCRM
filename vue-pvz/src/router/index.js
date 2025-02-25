import { createRouter, createMemoryHistory } from 'vue-router';
import LocationView from '../views/LocationView.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'location',
      component: LocationView,
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue'),
    },
  ],
});

export default router;

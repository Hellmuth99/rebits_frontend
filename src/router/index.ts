// import VehiclesLayout from '@/modules/mantenedor/layouts/VehiclesLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
import MantenedorLayout from '@/modules/mantenedor/layouts/MantenedorLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mantenedor',
      component: MantenedorLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/modules/mantenedor/views/HomeView.vue'),
        },

        // {
        //   path: '/vehicles',
        //   name: 'vehicles',
        //   component: () => import('@/modules/vehicles/views/VehiclesView.vue'),
        // },

        {
          path: '/vehicles',
          name: 'vehicles',
          component: () => import('@/modules/vehicles/views/VehicleViewNew.vue'),
          // component: () => import('@/modules/vehicles/views/VehiclesView2.vue'),
        },

        {
          path: '/users',
          name: 'users',
          component: () => import('@/modules/users/views/UsersView.vue'),
        },

        // {
        //   path: '/vehiculos/:vehicleId',
        //   name: 'users',
        // props:true
        //   component: () => import('@/modules/users/views/UsersView.vue'),
        // },
      ],
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;

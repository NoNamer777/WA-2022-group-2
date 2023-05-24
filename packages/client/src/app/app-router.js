import { createRouter, createWebHistory } from 'vue-router';
import {
  ChallengeProgressView,
  ChallengeView,
  HomeView,
  InfoView,
  LoginView,
  RegisterView
} from './views';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Hoofdpagina'
      }
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: ChallengeView,
      meta: {
        title: 'Challenge progress',
        requiresAuth: true
      }
    },
    {
      /* TODO, will be replaced with a final view such as /challenge/:id */
      path: '/challengeTest',
      name: 'actieve challenge',
      component: ChallengeProgressView,
      meta: {
        title: 'Actieve challenge',
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Log in'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Registreer'
      }
    },
    {
      path: '/info',
      name: 'info',
      component: InfoView,
      meta: {
        title: 'Informatie'
      }
    }
  ]
});

router.beforeEach(async (to, from) => {
  scrollToTop();
  focusTopElement(to.meta.title, from.meta.title);

  return await guardAuthenticatedRoutes(to);
});

router.afterEach((to) => {
  const title = to.meta.title;

  if (title) {
    document.title = title;
  }
});

/** @return {void} */
function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

/**
 * @param titleTo {string}
 * @param titleFrom {string}
 * @return {void}
 */
function focusTopElement(titleTo, titleFrom) {
  const topElement = document.getElementById('top');

  if (titleTo !== titleFrom) {
    topElement.focus();
  }
}

/**
 * @param routeTo {import('vue-router').RouteLocationNormalized}
 * @return {Promise<import('vue-router').RouteLocationNormalized | boolean>}
 */
async function guardAuthenticatedRoutes(routeTo) {
  const authenticationStore = useAuthStore();

  if (['register', 'login'].includes(routeTo.name) && authenticationStore.isAuthenticated) {
    return { name: 'home' };
  }
  // TODO: Add redirect routes
  if (routeTo.meta.requiresAuth && !authenticationStore.isAuthenticated) {
    return { name: 'login' };
  }
  return true;
}

import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './auth';
import {
  ConfirmRegistrationView,
  LoginView,
  RegisterView,
  RequestPasswordResetView,
  ResetPasswordView
} from './auth/views';
import { ChallengeCreationView, ChallengeProgressView, ChallengeView } from './challenge/views';
import { HomeView } from './core/views';
import PageNotFound from './errors/PageNotFound.vue';
import GroupView from './group/views/GroupView.vue';
import PersonalPageView from './personal_page/views/PersonalPageView.vue';

export const router = createRouter({
  history: createWebHistory(),
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
      path: '/challenges',
      name: 'challenges',
      component: ChallengeView,
      meta: {
        title: 'Challenge overzicht',
        requiresAuth: true
      }
    },
    {
      path: '/challenges/:challengeId/progress',
      name: 'challenge_progress',
      component: ChallengeProgressView,
      meta: {
        title: 'Challenge voortgang',
        requiresAuth: true
      }
    },
    {
      path: '/challenges/create',
      name: 'challenge_create',
      component: ChallengeCreationView,
      meta: {
        title: 'Challenge Aanmaken',
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
      path: '/reset-password/step-1',
      name: 'request password reset',
      component: RequestPasswordResetView,
      meta: {
        title: 'Aanvraag wachtwoord herstellen'
      }
    },
    {
      path: '/reset-password/step-2',
      name: 'reset password',
      component: ResetPasswordView,
      meta: {
        title: 'Wachtwoord herstellen'
      }
    },
    {
      path: '/verify-registration',
      name: 'verify registration',
      component: ConfirmRegistrationView,
      meta: {
        title: 'Registratie bevestigen'
      }
    },
    {
      path: '/my-wasted',
      name: 'my-wasted',
      component: PersonalPageView,
      meta: {
        title: 'Mijn Wasted',
        requiresAuth: true
      }
    },
    {
      path: '/groups',
      name: 'groups',
      component: GroupView,
      meta: {
        title: 'Groepen',
        requiresAuth: true
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: PageNotFound,
      meta: {
        title: '404 Pagina niet gevonden'
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

import { createRouter, createWebHistory } from 'vue-router'

// Import des composants
import Welcome from './pages/Welcome.vue'
import Dashboard from './pages/interface/Dashboard.vue'
import Bot from './pages/interface/Bot.vue'
import Analyse from './pages/interface/Analyse.vue'
import Marche from './pages/interface/Marche.vue'
import Strategie from './pages/interface/Strategie.vue'
import Home from './pages/interface/Home.vue'

// Auth pages
import Login from './pages/auth/Login.vue'
import Register from './pages/auth/Register.vue'
import ForgotPassword from './pages/auth/ForgotPassword.vue'
import ResetPassword from './pages/auth/ResetPassword.vue'
import ConfirmPassword from './pages/auth/ConfirmPassword.vue'
import VerifyEmail from './pages/auth/VerifyEmail.vue'

// Settings pages
import Profile from './pages/settings/Profile.vue'
import Password from './pages/settings/Password.vue'
import Appearance from './pages/settings/Appearance.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  // Routes directes (sans préfixe /interface/)
  {
    path: '/bot',
    name: 'bot',
    component: Bot
  },
  {
    path: '/analyse',
    name: 'analyse',
    component: Analyse
  },
  {
    path: '/marche',
    name: 'marche',
    component: Marche
  },
  {
    path: '/strategie',
    name: 'strategie',
    component: Strategie
  },
  {
    path: '/interface/dashboard',
    name: 'interface.dashboard',
    component: Dashboard
  },
  {
    path: '/interface/bot',
    name: 'interface.bot',
    component: Bot
  },
  {
    path: '/interface/analyse',
    name: 'interface.analyse',
    component: Analyse
  },
  {
    path: '/interface/marche',
    name: 'interface.marche',
    component: Marche
  },
  {
    path: '/interface/strategie',
    name: 'interface.strategie',
    component: Strategie
  },
  {
    path: '/interface/home',
    name: 'interface.home',
    component: Home
  },
  // Auth routes
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword
  },
  {
    path: '/confirm-password',
    name: 'confirm-password',
    component: ConfirmPassword
  },
  {
    path: '/verify-email',
    name: 'verify-email',
    component: VerifyEmail
  },
  // Settings routes
  {
    path: '/settings/profile',
    name: 'settings.profile',
    component: Profile
  },
  {
    path: '/settings/password',
    name: 'settings.password',
    component: Password
  },
  {
    path: '/settings/appearance',
    name: 'settings.appearance',
    component: Appearance
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

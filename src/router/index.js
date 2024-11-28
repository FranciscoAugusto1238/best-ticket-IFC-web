import { createRouter, createWebHistory } from 'vue-router';
import BaseLayout from '@/layouts/LayoutPadrao.vue';
import LoginLayout from '@/layouts/LoginLayout.vue';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import CadastroUsuario from '@/views/usuario/CadastroUsuario.vue';
import Eventos from '@/views/eventos/CadastroEventos.vue';
import CompraEvento from '@/views/eventos/CompraEvento.vue';
import CadastrarPermissao from '@/views/permissão/CadastrarPermissao.vue';
import CadastrarPermissaoUsuario from '@/views/permissão/CadastrarPermissaoUsuario.vue';
import Login from '@/views/login/LoginForm.vue';
import ListarUsuario from '@/views/usuario/ListarUsuario.vue';
import ListarPermissaoUsuario from '@/views/permissão/ListarPermissaoUsuario.vue';

const routes = [
  {
    path: '/',
    name: 'cadastroAssociado',
    component: BaseLayout,
    children: [
      { path: '', name: 'Home', component: Home, meta: { requiresAuth: true } },
      { path: 'about', name: 'About', component: About, meta: { requiresAuth: true } },
      { path: 'eventos', name: 'Eventos', component: Eventos, meta: { requiresAuth: true } },
      { path: 'compra-evento', name: 'CompraEvento', component: CompraEvento, meta: { requiresAuth: true } },
      { path: 'cadastro-permissao', name: 'CadastrarPermissao', component: CadastrarPermissao, meta: { requiresAuth: true } },
      { path: 'cadastro-permissao-usuario', name: 'CadastrarPermissaoUsuario', component: CadastrarPermissaoUsuario, meta: { requiresAuth: true } },
      { path: 'listar-usuario', name: 'ListarUsuario', component: ListarUsuario, meta: { requiresAuth: true } },
      { path: 'listar-permisssao-usuario', name: 'ListarPermissaoUsuario', component: ListarPermissaoUsuario, meta: { requiresAuth: true } },
      { path: 'cadastro-usuario/:id?', name: 'CadastroUsuario', component: CadastroUsuario, meta: { requiresAuth: true } },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginLayout,
    children: [
      { path: '', name: 'LoginForm', component: Login },
      { path: 'cadastro-usuario', name: 'CadastroUsuario', component: CadastroUsuario },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const usuario = localStorage.getItem('usuario');
    
    if (!usuario) {
      if (to.name !== 'LoginForm') {
        next({ name: 'LoginForm', query: { redirect: to.fullPath } });
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;

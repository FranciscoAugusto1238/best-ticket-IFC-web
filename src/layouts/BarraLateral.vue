<template>
  <v-navigation-drawer
    app
    permanent
    clipped
    class="elevation-12 rounded-drawer"
    :style="{ backgroundColor: '#2C3E50' }"
  >
    <v-row class="d-flex align-center pa-3 user-info">
      <v-avatar size="50" class="avatar">
        <v-img :src="usuarioLogado?.foto || '/img/avatar-placeholder.png'"></v-img>
      </v-avatar>
      <v-col class="ml-3 user-details">
        <v-list-item-title class="white--text font-weight-bold user-name">
          {{ usuarioLogado?.nome || 'Usuário' }}
        </v-list-item-title>
        <v-list-item-subtitle class="white--text user-role">
          {{ usuarioLogado?.role || 'Usuário Padrão' }}
        </v-list-item-subtitle>
      </v-col>
    </v-row>
    
    <v-divider></v-divider>
    
    <v-list dense>
      <v-list-item-group v-for="item in menuItems" :key="item.text" class="menu-item">
        <router-link :to="item.to">
          <v-list-item :class="{ 'menu-item-active': item.to === $route.path }">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">{{ item.text }}</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
    
    <v-divider></v-divider>
    
    <v-list>
      <v-list-item @click="logout" class="menu-item rounded-item">
        <v-list-item-icon>
          <v-icon color="red">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { text: "Início", to: "/", icon: "mdi-home" },
        { text: "Sobre", to: "/about", icon: "mdi-information" },
        { text: "Cadastro Eventos", to: "/eventos", icon: "mdi-calendar-plus" },
        { text: "Comprar Eventos", to: "/compra-evento", icon: "mdi-cart" },
        { text: "Cadastro Permissão", to: "/cadastro-permissao", icon: "mdi-shield-key" },
        { text: "Cadastro Permissão Usuario", to: "/cadastro-permissao-usuario", icon: "mdi-account-key" },
        { text: "Listar Permissão Usuario", to: "/listar-permisssao-usuario", icon: "mdi-account-key" },
        { text: "Listar Usuario", to: "/listar-usuario", icon: "mdi-account-key" },
        

      ],
      usuarioLogado: null,
    };
  },
  mounted() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      this.usuarioLogado = usuario;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('usuario');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #34495e;
  border-radius: 8px;
}

.avatar {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 5px;
}

.user-role {
  font-size: 14px;
  color: #aab2b9;
}

.menu-item {
  display: flex;
  align-items: center;
  color: #ffffff;
  transition: all 0.3s ease;
  border-radius: 12px;
}

.menu-item:hover {
  background-color: #34495e;
  cursor: pointer;
}

.menu-item-active {
  background-color: #1abc9c !important;
}

.menu-item-icon {
  margin-right: 8px;
}

.v-icon {
  font-size: 24px;
}

.v-list-item-title {
  font-weight: 500;
}

.white--text {
  color: white !important;
}

.v-navigation-drawer {
  background-color: #2C3E50;
  width: 250px;
  border-radius: 8px;
}

.v-list {
  margin-top: 20px;
}

.v-divider {
  margin: 20px 0;
  border-radius: 2px;
}

.rounded-item {
  border-radius: 6px;
}
</style>

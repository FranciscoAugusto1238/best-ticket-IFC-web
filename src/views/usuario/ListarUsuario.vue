<template>
    <v-app>
      <v-main>
        <v-container>
          <v-row>
            <v-col>
              <v-btn color="primary" @click="fetchUsers">Carregar Usuários</v-btn>
            </v-col>
          </v-row>
          
          <v-row>
            <v-col>
              <v-data-table
                v-if="users.length > 0"
                :headers="headers"
                :items="users"
                item-key="id"
                class="elevation-1"
              >
                <!-- Aplique o slot 'item' para a coluna de Ações -->
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn @click="editUser(item)" color="blue" small>Edit</v-btn>
                  <v-btn @click="deleteUser(item.id)" color="red" small>Delete</v-btn>
                </template>
              </v-data-table>
  
              <v-alert v-else type="info" class="mt-4">
                Nenhum usuário encontrado.
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import usuarioService from "@/service/UsuarioService.js";
  import {exibirModalConfirmacao } from '@/util/MessageUtils.js';

  export default {
    data() {
      return {
        users: [],
        headers: [
          { text: 'ID', align: 'start', key: 'id', sortable: true },
          { text: 'Nome', value: 'nome', sortable: true },
          { text: 'Email', value: 'email', sortable: true },
          { text: 'Ações', value: 'actions', sortable: false },
        ],
      };
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await usuarioService.listarTodos();
          this.users = response; 
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      },
      editUser(user) {
        this.$router.push({ name: 'cadastro-usuario', params: { id: user.id } });
      },
      deleteUser(userId) {
        exibirModalConfirmacao("Tem certeza que deseja excluir esse usuário?", "Excluir Usuário", {
          confirmButtonText: "Sim",
          cancelButtonText: "Cancelar",
          type: "warning",
        }).then(() => {
          usuarioService.excluir(userId).then(() => {
            this.fetchUsers(); 
          });
        });
      }
    },
    mounted() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  </style>
  
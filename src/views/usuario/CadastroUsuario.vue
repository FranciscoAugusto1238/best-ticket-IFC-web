<template>
  <v-container>
    <v-form v-model="formValid" ref="form">
      <v-text-field
        v-model="usuario.nome"
        label="Nome"
        :rules="[rules.required]"
        required
      />
      
      <v-text-field
        v-model="usuario.email"
        label="Email"
        :rules="[rules.required, rules.email]"
        required
      />
      
      <v-text-field
        v-model="usuario.senha"
        label="Senha"
        :rules="[rules.required]"
        type="password"
        required
      />
      
      <v-text-field
        v-model="usuario.telefone"
        label="Telefone"
        :rules="[rules.required]"
        required
      />
      
      <v-switch
        v-model="usuario.ativo"
        label="Ativo"
        :rules="[rules.required]"
        required
      />
      
      <v-btn color="primary" @click="salvarUsuario" :disabled="!formValid">
        {{ usuario.id ? 'Salvar Alterações' : 'Salvar' }}
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import usuarioService from '@/service/UsuarioService.js';

export default {
  data() {
    return {
      formValid: false,
      usuario: {
        id: '',
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        ativo: true,
      },
      rules: {
        required: (value) => !!value || 'Este campo é obrigatório',
        email: (value) => /.+@.+/.test(value) || 'E-mail inválido',
      },
    };
  },
  methods: {
    async salvarUsuario() {
      try {
        let response;
        if (this.usuario.id) {
          response = await usuarioService.editar(this.usuario);
          if (response && response.success) {
            this.$toast.success('Usuário alterado com sucesso');
          } else {
            this.$toast.error('Erro ao editar usuário');
          }
        } else {
          response = await usuarioService.salvar(this.usuario);
          if (response && response.success) {
            this.$toast.success('Usuário salvo com sucesso');
          } else {
            this.$toast.error('Erro ao salvar usuário');
          }
        }

        this.$router.push({ name: 'ListarUsuario' });
      } catch (error) {
        console.error('Erro ao salvar usuário', error);
        this.$toast.error('Erro ao salvar usuário');
      }
    },
    async carregarUsuario() {
      const id = this.$route.params.id;
      if (id) {
        try {
          const response = await usuarioService.buscar(id);
          this.usuario = response;
        } catch (error) {
          console.error('Erro ao carregar usuário', error);
          this.$toast.error('Erro ao carregar usuário');
        }
      }
    },
  },
  mounted() {
    this.carregarUsuario();
  },
};
</script>

<style scoped>
</style>
